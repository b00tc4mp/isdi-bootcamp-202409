import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')
    return (async () => {
        let users
        try {
            users = await Promise.all([
                User.findById(userId).lean(),
                User.findById(targetUserId).lean()
            ])
        } catch (error) {
            throw new SystemError(error.message)
        }

        const [user, targetUser] = users

        if (!user) throw new NotFoundError('user not found')
        if (!targetUser) throw new NotFoundError('target user not found')

        user.id = user._id.toString()
        delete user._id

        targetUser.id = targetUser._id.toString()
        delete targetUser._id

        return targetUser

    })()
}