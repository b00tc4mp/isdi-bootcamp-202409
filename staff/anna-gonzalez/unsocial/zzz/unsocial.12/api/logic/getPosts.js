import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.find(userId)
        })
}