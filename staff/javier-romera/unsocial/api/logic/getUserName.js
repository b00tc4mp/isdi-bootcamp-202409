import db from 'dat'

import { validate, errors } from 'apu'

const { SystemError, NotFoundError } = errors

const { ObjectId } = db

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectTargetUserId = ObjectId.createFromHexString(targetUserId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return db.users.findOne({ _id: objectTargetUserId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (!user) throw new NotFoundError('target user not found')

            return user.name
        })
}