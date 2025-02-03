import { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([
        User.findById(userId).lean(),
        User.findById(targetUserId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(({ user, targetUser }) => {
            if (!user) throw new NotFoundError('User not found')
            if (!targetUser) throw new NotFoundError('Target user is not found')

            return targetUser
        })
}