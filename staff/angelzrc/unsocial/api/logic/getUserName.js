import db from 'dat'
import { models } from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors
const { User } = models

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')


            return db.users.findOne({ _id: new ObjectId(targetUserId) })
                .catch(error => { new Error(error.message) })
        })
        .then(user => {
            if (!user) throw new NotFoundError('target user not found')

            return user.name
        })
}