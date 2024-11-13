import db from 'dat'
import { models } from 'dat'

import { validate, errors } from 'apu'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors
const { User } = models

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    const objectUserId = new ObjectId(userId)
    const objectTargetUserId = new ObjectId(targetUserId)

    return User.findOne({ _id: objectUserId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findOne({ _id: objectTargetUserId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (!user) throw new NotFoundError('target user not found')

            return user.name
        })
}