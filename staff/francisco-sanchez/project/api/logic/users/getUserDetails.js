import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(targetUserId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}