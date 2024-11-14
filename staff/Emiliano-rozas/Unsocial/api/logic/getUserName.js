import { models } from 'dat'
import { validate, errors } from 'com'

const { User } = models

const { SystemError, NotFoundError } = errors

// const { ObjectId } = db

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findById(targetUserId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (!user) throw new NotFoundError('target user not found')

            return user.name
        })
}