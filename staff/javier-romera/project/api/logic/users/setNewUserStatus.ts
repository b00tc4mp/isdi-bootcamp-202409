import { validate, errors } from 'com'
import { User } from 'dat'

const { NotFoundError, SystemError } = errors

export default (userId: string, newStatus: Number) => {
    validate.id(userId, 'userId')
    validate.status(newStatus)

    return (async () => {
        let user

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            await User.updateOne({ _id: userId }, { $set: { status: newStatus } })
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }
    })()
}