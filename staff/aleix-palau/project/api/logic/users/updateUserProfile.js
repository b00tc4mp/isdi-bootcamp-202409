import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, DuplicityError } = errors

export default (userId, updates) => {
    validate.id(userId, 'userId')

    const { name, dateOfBirth, gender, targetGender, artists, bio, location, minAge, maxAge, distance, coordinates, spotifyId, spotifyAccessToken, spotifyRefreshToken } = updates

    if (name !== undefined) validate.name(name)
    if (dateOfBirth !== undefined) validate.dateOfBirth(dateOfBirth)
    if (gender !== undefined) validate.gender(gender)
    if (targetGender !== undefined) validate.targetGender(targetGender)
    if (artists !== undefined) validate.artists(artists)
    if (bio !== undefined) validate.bio(bio)
    if (location !== undefined) validate.location(location)
    if (minAge !== undefined) validate.minAge(minAge, maxAge)
    if (maxAge !== undefined) validate.maxAge(maxAge, minAge)
    if (distance !== undefined) validate.distance(distance)
    if (coordinates !== undefined) validate.coordinates(coordinates)
    if (spotifyId !== undefined) validate.spotifyId(spotifyId)
    if (spotifyAccessToken !== undefined) validate.spotifyToken(spotifyAccessToken)
    if (spotifyRefreshToken !== undefined) validate.spotifyToken(spotifyRefreshToken)

    return (async () => {
        let user
        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        // Construct the update object carefully to avoid overwriting fields with undefined
        const updateData = {}
        if (name !== undefined) updateData.name = name
        if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth
        if (gender !== undefined) updateData.gender = gender
        if (targetGender !== undefined) updateData.targetGender = targetGender
        if (artists !== undefined) updateData.artists = artists
        if (bio !== undefined) updateData.bio = bio
        if (location !== undefined) updateData.location = location
        if (minAge !== undefined) updateData.minAge = minAge
        if (maxAge !== undefined) updateData.maxAge = maxAge
        if (distance !== undefined) updateData.distance = distance
        if (coordinates !== undefined) updateData.coordinates = coordinates
        if (spotifyId !== undefined) updateData.spotifyId = spotifyId
        if (spotifyAccessToken !== undefined) updateData.spotifyAccessToken = spotifyAccessToken
        if (spotifyRefreshToken !== undefined) updateData.spotifyRefreshToken = spotifyRefreshToken

        try {
            // Using $set to update only specified fields
            await User.findByIdAndUpdate(userId, { $set: updateData })
        } catch (error) {
            // Handling potential MongoDB errors, e.g., unique constraint violation for spotifyId
            if (error.code === 11000 && error.keyPattern && error.keyPattern.spotifyId) {
                throw new DuplicityError('Spotify ID already in use.')
            }
            throw new SystemError(error.message)
        }
    })()
}