import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, updates) => {
    validate.id(userId, 'userId')

    const { name, dateOfBirth, gender, targetGender, artists, bio, location, minAge, maxAge, distance, coordinates } = updates

    if (name !== undefined) validate.name(name)
    if (dateOfBirth !== undefined) validate.dateOfBirth(dateOfBirth)
    if (gender !== undefined) validate.gender(gender)
    if (targetGender !== undefined) validate.targetGender(targetGender)
    if (artists !== undefined) validate.artists(artists)
    if (bio !== undefined) validate.bio(bio)
    if (location !== undefined) validate.location(location)
    if (minAge !== undefined) validate.minAge(minAge)
    if (maxAge !== undefined) validate.maxAge(maxAge)
    if (distance !== undefined) validate.distance(distance)
    if (coordinates !== undefined) validate.coordinates(coordinates)

    return (async () => {
        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            await User.findByIdAndUpdate(userId, { $set: updates })
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}
// TODO: posar pictures/profilePicture a l'objecte?