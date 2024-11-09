import db from 'dat'

import { validate } from 'apu'

const { ObjectId } = db

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectPostId = ObjectId.createFromHexString(postId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error(error.message)

            return db.posts.findOne({ _id: objectPostId })
                .catch(error => { new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('post not found')

            const comment = {
                _id: new ObjectId,
                author: objectUserId,
                text,
                date: new Date
            }

            return db.posts.updateOne({ _id: objectPostId }, { $push: { comments: comment } })
        })
        .then(_ => { })
}