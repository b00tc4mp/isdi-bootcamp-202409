import db from 'dat'

import { validate } from 'apu'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectPostId = ObjectId.createFromHexString(postId)

    return Promise.all([
        db.users.findOne({ _id: objectUserId }),
        db.posts.findOne({ _id: objectPostId })
    ])
        .catch(error => { throw new Error(error.message) })
        .then(([user, post]) => {
            if (!user) throw new Error('user not found')
            if (!post) throw new Error('post not found')

            const { likedBy } = post

            const found = likedBy.some(id => id.equals(objectUserId))

            if (!found)
                return db.posts.updateOne({ _id: objectPostId }, { $push: { likedBy: objectUserId } })
                    .catch(error => { throw new Error(error.message) })

            return db.posts.updateOne({ _id: objectPostId }, { $pull: { likedBy: objectUserId } })
                .catch(error => { throw new Error(error.message) })
        })
        .then(_ => { })
}