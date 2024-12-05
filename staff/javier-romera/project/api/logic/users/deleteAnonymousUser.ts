import { validate, errors } from 'com'
import { User } from 'dat'

const { NotFoundError, ValidationError, SystemError } = errors

export default (userId: string): Promise<void> => {
    validate.id(userId, 'userId')

    return (async () => {
        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')
        if (user.role !== 'anonymous') throw new ValidationError('user is not anonymous')

        try {
            await User.deleteOne({ _id: userId })
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }
    })()
}