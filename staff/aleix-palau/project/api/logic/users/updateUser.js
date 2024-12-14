import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, updates) => {
    // to handle gender, targetGender, artists, etc. later
    const { name, dateOfBirth, gender, targetGender, artists } = updates

    validate.id(userId, 'userId')

    if (name !== undefined) validate.name(name)
    if (dateOfBirth !== undefined) validate.dateOfBirth(dateOfBirth)
    if (gender !== undefined) validate.gender(gender)
    if (targetGender !== undefined) validate.targetGender(targetGender)
    if (artists !== undefined) validate.artists(artists)

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