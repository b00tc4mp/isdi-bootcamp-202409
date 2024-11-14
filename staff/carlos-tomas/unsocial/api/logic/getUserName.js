import { models } from 'dat'
import { validate, errors } from 'com'

const { User } = models

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([
        User.findById(userId).lean(),
        User.findById(targetUserId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, targetUser]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!targetUser) throw new NotFoundError('user not found')

            return targetUser.name
        })
}