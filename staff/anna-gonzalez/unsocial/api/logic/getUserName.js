import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return db.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.users.findOne({ _id: new ObjectId(targetUserId) })
                .catch(error => { throw new Error(error.message) })
        })
        .then(user => {
            if (!user) throw new Error('Target user not found')

            return user.name
        })
}