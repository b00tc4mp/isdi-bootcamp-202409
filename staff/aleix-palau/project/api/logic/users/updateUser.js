import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, updates) => {
    const { name, dateOfBirth } = updates // to handle gender, targetGender, genres, artists, etc. later

    validate.id(userId, 'userId')
    validate.name(name)
    validate.dateOfBirth(dateOfBirth)

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