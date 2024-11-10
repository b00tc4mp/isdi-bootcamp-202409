import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    const userIdObject = ObjectId.createFromHexString(userId)
    const targetUserIdObject = ObjectId.createFromHexString(targetUserId)

    return db.users.findOne({ _id: userIdObject })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.users.findOne({ _id: targetUserIdObject })
                .catch(error => { new Error(error.message) })
        })
        .then(user => {
            if (!user) throw new Error('Target user not found')

            return user.name
        })
}