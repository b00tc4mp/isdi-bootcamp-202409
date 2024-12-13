import { validate, errors } from 'com'
import { TUser, User } from 'dat'
const { NotFoundError, SystemError } = errors

export default (userId: string, targetUserId: string): Promise<number> => {
    validate.id(userId, 'userId')

    return (async (): Promise<number> => {
        let user, targetUser

        try {
            user = await User.findById(userId).lean<TUser>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            targetUser = await User.findById(targetUserId).lean<TUser>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!targetUser) throw new NotFoundError('user not found')

        return targetUser.score
    })()
}