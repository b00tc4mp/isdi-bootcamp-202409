import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId: string, targetUserId: string): Promise<string | undefined> => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return (async () => {
        try {
            const [user, targetUser] = await Promise.all([User.findById(userId).lean(), User.findById(targetUserId).lean()])

            if (!user) throw new NotFoundError('user not found')
            if (!targetUser) throw new NotFoundError('target user not found')

            return targetUser.username
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }
    })()
}