import { User, Heartbeat } from 'dat'
import { validate, errors } from 'com'
import { calculateAge, getDistance } from '../../../app/src/util/index.js'

const { SystemError, NotFoundError } = errors

const genderMapping = {
    'Men': 'Man',
    'Women': 'Woman',
    'Nonbinary people': 'Nonbinary'
}

export default (userId, page = 1, limit = 10) => {
    validate.id(userId, 'userId')

    // Validate pagination parameters
    if (typeof page !== 'number' || page < 1) page = 1
    if (typeof limit !== 'number' || limit < 1 || limit > 100) limit = 10

    return (async () => {
        let user // This is User A (the requesting user)

        try {
            // Fetch the full profile of the requesting user, not just lean, as we need their gender/age/coords for mutual checks later.
            // Select necessary fields explicitly for efficiency if needed.
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        // Calculate User A's age once
        const userAge = user.dateOfBirth ? calculateAge(user.dateOfBirth) : null

        // Get User A's preferences and artists
        const { targetGender, minAge, maxAge, distance, coordinates, artists, gender: userGender } = user
        const userArtists = artists || []

        // Get users User A has already interacted with
        const interactedWith = await Heartbeat.find({ sender: userId })
            .distinct('receiver')
            .lean()
        interactedWith.push(userId) // Exclude self

        // --- Step 1: Initial Query based on User A's preferences ---
        const query = {
            _id: { $nin: interactedWith },
            stage: 'completed'
        }

        // Apply User A's target gender filter
        if (targetGender && targetGender.length > 0) {
            const targetGendersMapped = targetGender.map(tg => genderMapping[tg]).filter(Boolean)
            if (targetGendersMapped.length > 0) {
                query.gender = { $in: targetGendersMapped }
            }
        }

        // Apply User A's age range filter
        if (minAge > 0 && maxAge > 0) {
            const today = new Date()
            const minDate = new Date(today)
            minDate.setFullYear(today.getFullYear() - maxAge - 1)
            minDate.setDate(minDate.getDate() + 1)
            const maxDate = new Date(today)
            maxDate.setFullYear(today.getFullYear() - minAge)
            query.dateOfBirth = { $gt: minDate, $lte: maxDate }
        }

        // Apply User A's distance filter (if coordinates available)
        if (coordinates && coordinates.coordinates) {
            query.coordinates = {
                $near: {
                    $geometry: { type: 'Point', coordinates: coordinates.coordinates },
                    $maxDistance: distance * 1000 // Convert km to meters
                }
            }
        } else {
            return []
        }

        // Apply User A's common artist filter
        if (userArtists.length > 0) {
            query.artists = { $in: userArtists } // Match users who have at least one artist in common
        }

        // Find potential matches based *only* on User A's criteria
        const initialPotentialMatches = await User.find(query)
            // Select all fields needed for mutual check AND final display
            .select('name dateOfBirth bio profilePicture pictures location artists gender targetGender coordinates distance minAge maxAge _id')
            .lean()

        // --- Step 2: Mutual Compatibility Filter ---
        const mutuallyCompatibleMatches = initialPotentialMatches.filter(potentialMatch => { // potentialMatch is User B
            // a) Check if User B's targetGender includes User A's gender
            if (!userGender) return false // User A must have a gender defined
            const potentialMatchTargetGenders = potentialMatch.targetGender || []
            const potentialMatchTargetsMapped = potentialMatchTargetGenders.map(tg => genderMapping[tg]).filter(Boolean)
            if (!potentialMatchTargetsMapped.includes(userGender)) {
                return false // User B is not looking for User A's gender
            }

            // b) Check if User A's age is within User B's age range preference
            const userBAgeMin = potentialMatch.minAge || 18
            const userBAgeMax = potentialMatch.maxAge || 55 // Use defaults if not set
            if (userAge === null || userAge < userBAgeMin || userAge > userBAgeMax) {
                return false // User A's age is outside User B's preference
            }

            // c) Check if distance is within User B's distance preference (Optional but recommended)
            if (potentialMatch.coordinates && potentialMatch.coordinates.coordinates &&
                user.coordinates && user.coordinates.coordinates &&
                potentialMatch.distance) { // Check if User B has set a distance preference
                const distanceBetweenUsers = getDistance(user.coordinates, potentialMatch.coordinates) // in km
                if (distanceBetweenUsers === null || distanceBetweenUsers > potentialMatch.distance) {
                    return false // User A is further away than User B prefers
                }
            }
            // If User B hasn't set distance preference, or coords are missing, we might allow the match
            // based on User A's distance filter already applied, or enforce stricter rules.
            // Current logic: If B has a distance set, check it. Otherwise, ignore B's distance.

            // If all checks pass, this is a mutual match
            return true
        })

        // --- Step 3: Process Mutually Compatible Matches ---

        // Calculate common artists for the *filtered* matches
        const matchesWithCommonArtists = mutuallyCompatibleMatches.map(match => {
            const matchArtists = match.artists || []
            const commonArtists = matchArtists.filter(artist => userArtists.includes(artist))

            return {
                // Keep only fields needed for the frontend display
                _id: match._id,
                name: match.name,
                dateOfBirth: match.dateOfBirth, // Keep DOB for age calculation on client if needed
                location: match.location,
                artists: match.artists, // Send all artists? Or just common?
                bio: match.bio,
                profilePicture: match.profilePicture,
                pictures: match.pictures,
                coordinates: match.coordinates, // Keep coords for distance display on client
                age: match.dateOfBirth ? calculateAge(match.dateOfBirth) : null,
                commonArtistsCount: commonArtists.length,
                commonArtists // Send the list of common artists
            }
        })

        // Sort by number of common artists (descending)
        const sortedMatches = matchesWithCommonArtists.sort((a, b) => b.commonArtistsCount - a.commonArtistsCount)

        // Apply pagination after filtering and sorting
        const paginatedMatches = sortedMatches.slice((page - 1) * limit, page * limit)

        return paginatedMatches
    })()
}
// TODO: delete console warns/some console logs across all app?