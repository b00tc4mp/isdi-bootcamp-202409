import { User, Heartbeat } from 'dat'
import { validate, errors } from 'com'
import { calculateAge, getDistance } from '../../../app/src/util/index.js'

const { SystemError, NotFoundError } = errors

// Map frontend gender terminology to database values
const genderMapping = {
    'Men': 'Man',
    'Women': 'Woman',
    'Nonbinary people': 'Nonbinary'
}

export default (userId, page = 1, limit = 10) => {
    validate.id(userId, 'userId')

    // Normalize pagination parameters
    page = normalizePageParam(page)
    limit = normalizeLimitParam(limit)

    return (async () => {
        try {
            // Fetch the requesting user
            const user = await User.findById(userId).lean()
            if (!user) throw new NotFoundError('user not found')

            // Get IDs of users already swiped on
            const interactedWith = await getInteractedUserIds(userId)

            // Build and execute the query for initial filtering
            const initialMatches = await queryPotentialMatches(user, interactedWith)

            // Filter for mutual compatibility
            const mutuallyCompatibleMatches = filterMutuallyCompatible(user, initialMatches)

            // Prepare final match data with common artists info
            const processedMatches = processMatchResults(user, mutuallyCompatibleMatches)

            // Return paginated results
            return paginateResults(processedMatches, page, limit)
        } catch (error) {
            if (error instanceof NotFoundError) throw error

            throw new SystemError(error.message)
        }
    })()
}

// Normalize page parameter to a valid value
function normalizePageParam(page) {
    return (typeof page !== 'number' || page < 1) ? 1 : page
}

// Normalize limit parameter to a valid value
function normalizeLimitParam(limit) {
    return (typeof limit !== 'number' || limit < 1 || limit > 100) ? 10 : limit
}

// Get IDs of users the requesting user has already interacted with
async function getInteractedUserIds(userId) {
    const interactedWith = await Heartbeat.find({ sender: userId })
        .distinct('receiver')
        .lean()

    // Include self in the exclusion list
    interactedWith.push(userId)
    return interactedWith
}

// Build and execute query for potential matches based on user preferences
async function queryPotentialMatches(user, interactedWith) {
    const { targetGender, minAge, maxAge, distance, coordinates, artists: userArtistsArray } = user

    // Base query - exclude already interacted with and require completed profile
    const query = {
        _id: { $nin: interactedWith },
        stage: 'completed'
    }

    // Apply gender preference
    if (targetGender && targetGender.length > 0) {
        const targetGendersMapped = targetGender.map(tg => genderMapping[tg]).filter(Boolean)
        if (targetGendersMapped.length > 0)
            query.gender = { $in: targetGendersMapped }
    }

    // Apply age range preference
    if (minAge > 0 && maxAge > 0) {
        const today = new Date()
        const minDate = new Date(today)
        minDate.setFullYear(today.getFullYear() - maxAge - 1)
        minDate.setDate(minDate.getDate() + 1)

        const maxDate = new Date(today)
        maxDate.setFullYear(today.getFullYear() - minAge)

        query.dateOfBirth = { $gt: minDate, $lte: maxDate }
    }

    // Apply location preference if coordinates available
    if (coordinates && coordinates.coordinates) {
        query.coordinates = {
            $near: {
                $geometry: { type: 'Point', coordinates: coordinates.coordinates },
                $maxDistance: distance * 1000 // Convert km to meters
            }
        }
    } else {
        return [] // Can't match without location
    }

    // Apply artist preference if available
    if (userArtistsArray && userArtistsArray.length > 0) {
        const userArtistIds = userArtistsArray.map(artist => artist.id) // Extract IDs
        query['artists.id'] = { $in: userArtistIds } // Match users with at least one artist in common
    }

    // Execute query with required fields
    return User.find(query)
        .select('name dateOfBirth bio profilePicture pictures location artists gender targetGender coordinates distance minAge maxAge _id')
        .lean()
}

// Filter matches based on mutual compatibility
function filterMutuallyCompatible(user, potentialMatches) {
    const userAge = user.dateOfBirth ? calculateAge(user.dateOfBirth) : null
    const userGender = user.gender

    return potentialMatches.filter(potentialMatch => {
        // Check if potential match is interested in user's gender
        if (!userGender) return false

        const potentialMatchTargetGenders = potentialMatch.targetGender || []
        const potentialMatchTargetsMapped = potentialMatchTargetGenders
            .map(tg => genderMapping[tg])
            .filter(Boolean)

        if (!potentialMatchTargetsMapped.includes(userGender)) {
            return false // Not interested in user's gender
        }

        // Check if user's age is in potential match's preferred range
        const userBAgeMin = potentialMatch.minAge || 18
        const userBAgeMax = potentialMatch.maxAge || 55

        if (userAge === null || userAge < userBAgeMin || userAge > userBAgeMax)
            return false // User too young/old for potential match

        // Check distance preference of potential match
        if (shouldCheckDistance(user, potentialMatch)) {
            const distanceBetweenUsers = getDistance(user.coordinates, potentialMatch.coordinates)
            if (distanceBetweenUsers === null || distanceBetweenUsers > potentialMatch.distance)
                return false // User too far away for potential match
        }

        return true // All compatibility checks passed
    })
}

// Determine if distance check should be performed
function shouldCheckDistance(user, potentialMatch) {
    return potentialMatch.coordinates &&
        potentialMatch.coordinates.coordinates &&
        user.coordinates &&
        user.coordinates.coordinates &&
        potentialMatch.distance
}

// Process matches to include compatibility information
function processMatchResults(user, matches) {
    const userArtists = user.artists || [] // Array of {id, name}

    // Add compatibility information to each match
    const processedMatches = matches.map(match => {
        const matchArtists = match.artists || [] // Array of {id, name}
        const commonArtistsObjects = matchArtists.filter(matchArtist =>
            userArtists.some(userArtist => userArtist.id === matchArtist.id)
        )
        const commonArtistsNames = commonArtistsObjects.map(artist => artist.name)

        return {
            _id: match._id,
            name: match.name,
            dateOfBirth: match.dateOfBirth,
            location: match.location,
            artists: match.artists,
            bio: match.bio,
            profilePicture: match.profilePicture,
            pictures: match.pictures,
            coordinates: match.coordinates,
            age: match.dateOfBirth ? calculateAge(match.dateOfBirth) : null,
            commonArtistsCount: commonArtistsNames.length,
            commonArtists: commonArtistsNames
        }
    })

    // Sort by number of common artists (descending)
    return processedMatches.sort((a, b) => b.commonArtistsCount - a.commonArtistsCount)
}

// Apply pagination to results
function paginateResults(results, page, limit) {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    return results.slice(startIndex, endIndex)
}