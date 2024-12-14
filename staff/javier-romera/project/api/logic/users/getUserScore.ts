import { validate, errors } from 'com'
import { TUser, User } from 'dat'
import { UserScoreAndUsername } from '../../types.js'
const { NotFoundError, SystemError } = errors

export default (userId: string, targetUserId: string): Promise<UserScoreAndUsername> => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return (async (): Promise<UserScoreAndUsername> => {
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

        if (!targetUser) throw new NotFoundError('target user not found')

        return {
            username: targetUser.username,
            score: targetUser.score
        }
    })()
}