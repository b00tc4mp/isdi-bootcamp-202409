import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    const userObjectId = ObjectId.createFromHexString(userId)
    const targetUserObjectId = ObjectId.createFromHexString(targetUserId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.users.findOne({ _id: targetUserObjectId })
                .catch(error => { throw new Error(error.message) })
        })
        .then(user => {
            if (!user) throw new Error('target user not found')

            return user.name
        })
}