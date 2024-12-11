import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId: string, targetUserId: string): Promise<string> => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return (async (): Promise<string> => {
        let user, targetUser

        try {
            const users = await Promise.all([User.findById(userId).lean(), User.findById(targetUserId).lean()])

            user = users[0]
            targetUser = users[1]
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) { throw new NotFoundError('user not found') }
        if (!targetUser) { throw new NotFoundError('target user not found') }

        return targetUser.username
    })()
}