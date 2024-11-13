import db from 'dat'
import { validate, errors } from 'com'

const ObjectId = db.ObjectId
export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return db.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            console.log(user)

            return db.users.findOne({ _id: ObjectId.createFromHexString(targetUserId) })
                .catch(error => { new Error(error.message) })
        })
        .then(user => {
            if (!user) throw new Error('target user not found')

            return user.name
        })
}