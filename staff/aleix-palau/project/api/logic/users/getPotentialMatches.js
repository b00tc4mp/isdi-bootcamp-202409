import { User, Heartbeat } from 'dat'
import { validate, errors } from 'com'
import { calculateAge } from '../../../app/src/util/index.js'

const { SystemError, NotFoundError } = errors

export default (userId, page = 1, limit = 10) => {
    validate.id(userId, 'userId')

    // Validate pagination parameters
    if (typeof page !== 'number' || page < 1) page = 1
    if (typeof limit !== 'number' || limit < 1 || limit > 100) limit = 10

    return (async () => {
        let user

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        // Get user's preferences and artists
        const { targetGender, minAge, maxAge, distance, coordinates, artists } = user

        // Ensure the user has artists defined
        const userArtists = artists || []

        // Get all users the current user has already interacted with
        const interactedWith = await Heartbeat.find({ sender: userId })
            .distinct('receiver')
            .lean()

        // Add the current user to the exclusion list
        interactedWith.push(userId)

        // Build query based on user preferences
        const query = {
            _id: { $nin: interactedWith },
            stage: 'completed' // Only show users who completed setup
        }

        // Apply gender filter if specified
        if (targetGender && targetGender.length > 0) {
            // Map the targetGender array to match the gender field format
            const genderMapping = {
                'Men': 'Man',
                'Women': 'Woman',
                'Nonbinary people': 'Nonbinary'
            }

            const targetGenders = targetGender.map(tg => genderMapping[tg]).filter(Boolean)

            if (targetGenders.length > 0) {
                query.gender = { $in: targetGenders }
            }
        }

        // Filter by date of birth to match age range
        if (minAge > 0 || maxAge > 0) {
            const today = new Date()

            // Calculate the date for minimum age (must be born before this date)
            const minDate = new Date(today)
            minDate.setFullYear(today.getFullYear() - maxAge - 1)
            minDate.setDate(minDate.getDate() + 1)

            // Calculate the date for maximum age (must be born after this date)
            const maxDate = new Date(today)
            maxDate.setFullYear(today.getFullYear() - minAge)

            query.dateOfBirth = {
                $gt: minDate,
                $lte: maxDate
            }
        }

        // If coordinates available, filter by distance
        if (coordinates && coordinates.coordinates) {
            query.coordinates = {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: coordinates.coordinates // Already in [longitude, latitude] format
                    },
                    $maxDistance: distance * 1000  // Convert km to meters
                }
            }
        }

        // Only match with users who have at least one artist in common with the current user
        if (userArtists.length > 0) {
            query.artists = { $in: userArtists } // Match users who have at least one artist in common
        }

        // Find users matching criteria
        const potentialMatches = await User.find(query)
            .select('name dateOfBirth location artists bio profilePicture pictures coordinates')
            .lean()

        // Calculate the number of common artists for each potential match
        const matchesWithCommonArtists = potentialMatches.map(match => {
            const matchArtists = match.artists || []
            const commonArtists = matchArtists.filter(artist => userArtists.includes(artist))

            return {
                ...match,
                age: match.dateOfBirth ? calculateAge(match.dateOfBirth) : null,
                commonArtistsCount: commonArtists.length,
                commonArtists
            }
        })

        // Filter out matches with no common artists, if the user has artists
        const filteredMatches = userArtists.length > 0
            ? matchesWithCommonArtists.filter(match => match.commonArtistsCount > 0)
            : matchesWithCommonArtists

        // Sort by number of common artists (descending)
        const sortedMatches = filteredMatches.sort((a, b) => b.commonArtistsCount - a.commonArtistsCount)

        // Apply pagination after sorting
        const paginatedMatches = sortedMatches.slice((page - 1) * limit, page * limit)

        return paginatedMatches
    })()
}