import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)
    const commentObjectId = new ObjectId(commentId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('Post not found')

            const { comments } = post

            const comment = comments.find(comment => comment._id.equals(commentObjectId))

            if (!comment) throw new Error('Comment not found')

            const { author: authorId } = comment

            if (!authorId.equals(userObjectId)) throw new Error('User is not author of comment')

            return db.posts.updateOne({ _id: postObjectId }, { $pull: { comments: { _id: commentObjectId } } })
                .catch(error => { throw new Error(error.message) })
        })
        .then(_ => { })
}