import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return (async () => {
        let user
        try {
            user = await User.findById(userId).select('-password ').lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) {
            throw new NotFoundError('user not found')
        }
        user.id = user._id.toString()
        delete user._id

        return user
    })()
}