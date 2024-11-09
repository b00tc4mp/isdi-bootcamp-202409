import db from 'dat'

import { validate } from 'apu'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectPostId = ObjectId.createFromHexString(postId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.findOne({ _id: objectPostId })
                .catch(error => { new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('post not found')

            const { likedBy } = post

            const found = likedBy.some(id => id.equals(objectUserId))

            if (!found)
                return db.posts.updateOne({ _id: objectPostId }, { $push: { likedBy: objectUserId } })
                    .then(_ => { console.log('liked') })
            else
                return db.posts.updateOne({ _id: objectPostId }, { $pull: { likedBy: objectUserId } })
                    .then(_ => { console.log('unliked') })
        })
}