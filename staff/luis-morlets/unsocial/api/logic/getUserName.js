import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    const userObjectId = ObjectId.createFromHexString(userId)
    const targetUserObjectId = ObjectId.createFromHexString(targetUserId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return db.users.findOne({ _id: targetUserObjectId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (!user) throw new NotFoundError('target user not found')

            return user.name
        })
}