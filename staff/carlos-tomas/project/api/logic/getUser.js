import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return (async () => {

        try {
            const user = await User.findById(userId).select('-password -role').lean()

            if (!user) {
                throw NotFoundError('user not found')
            }

            return user

        } catch (error) {
            throw new SystemError(error.message)
        }

    })()
}