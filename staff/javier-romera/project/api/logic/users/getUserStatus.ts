import { User } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId: string, targetUserId: string): Promise<number> => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return (async (): Promise<number> => {
        let user, targetUser

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        try {
            targetUser = await User.findById(targetUserId).lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) { throw new NotFoundError('user not found') }
        if (!targetUser) { throw new NotFoundError('target user not found') }

        return targetUser.status
    })()
}