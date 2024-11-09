import db from 'dat'

import { validate } from 'apu'

const { ObjectId } = db

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectTargetUserId = ObjectId.createFromHexString(targetUserId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.users.findOne({ _id: objectTargetUserId })
                .catch(error => { new Error(error.message) })
        })
        .then(user => {
            if (!user) throw new Error('target user not found')

            return user.name
        })
}