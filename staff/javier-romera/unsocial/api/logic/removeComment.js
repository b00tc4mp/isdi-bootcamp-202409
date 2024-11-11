import db from 'dat'

import { validate } from 'apu'

const { ObjectId } = db

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectPostId = ObjectId.createFromHexString(postId)
    const objectCommentId = ObjectId.createFromHexString(commentId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.findOne({ _id: objectPostId })
                .catch(error => { throw new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('post not found')

            const { comments } = post

            const comment = comments.find(comment => comment._id.equals(objectCommentId))

            if (!comment) throw new Error('comment not found')

            const { author: authorId } = comment

            if (!authorId.equals(objectUserId)) throw new Error('user is not author of comment')

            return db.posts.updateOne({ _id: objectPostId }, { $pull: { comments: { _id: objectCommentId } } })
        })
        .then(_ => { })
}