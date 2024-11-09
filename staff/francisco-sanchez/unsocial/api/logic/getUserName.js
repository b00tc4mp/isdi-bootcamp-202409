//import { storage } from '../data/index.js'
import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.users.findOne({ _id: ObjectId.createFromHexString(targetUserId) })
                .catch(error => { new Error(error.message) })
        })
        .then(user => {
            if (!user) throw new Error('user not found')

            return user.name
        })

    // const { users } = storage

    // const found = users.some(({ id }) => id === userId)
    // if (!found) throw new Error('user not found')

    // //const user = users.find(user => user.id === userId)
    // const user = users.find(({ id }) => id === targetUserId)
    // if (!user) throw new Error('user not found')


    // return user.name
}