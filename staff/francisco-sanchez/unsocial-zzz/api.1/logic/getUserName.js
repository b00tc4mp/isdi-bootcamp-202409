//import { storage } from '../data/index.js'
import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors


export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return db.users.findOne({ _id: ObjectId.createFromHexString(targetUserId) })
                .catch(error => { new Error(error.message) })
        })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user.name
        })

}