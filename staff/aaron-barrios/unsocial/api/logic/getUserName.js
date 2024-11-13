import db from 'dat'
import validate from './helpers/validate.js'

const { ObjectId } = db

import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return db.users.findOne({ _id: ObjectId.createFromHexString(targetUserId) })
                .catch(error => { new SystemError(error.message) })
        })
        .then(user => {
            if (!user) throw new NotFoundError('target user not found')

            return user.name
        })
}