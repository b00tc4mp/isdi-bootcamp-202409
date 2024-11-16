import { models } from 'dat'
import { errors } from 'com'
import validate from './helpers/validate.js'

const { SystemError, NotFoundError } = errors
const { User } = models


export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([
        User.findById(userId).lean(),
        User.findById(targetUserId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, targetUser]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!targetUser) throw new NotFoundError('target user not found')

            return targetUser.name
        })
}