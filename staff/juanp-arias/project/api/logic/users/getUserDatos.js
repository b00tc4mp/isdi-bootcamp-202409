import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([
        User.findById(userId).lean(),
        User.findById(targetUserId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(users => {
            const [user, targetUser] = users

            if (!user) throw new NotFoundError('user not found')
            if (!targetUser) throw new NotFoundError('target user not found')

            targetUser.id = targetUser._id.toString()
            delete targetUser._id

            return targetUser
        })
}