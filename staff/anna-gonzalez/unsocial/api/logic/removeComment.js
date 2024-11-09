import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const userIdObject = ObjectId.createFromHexString(userId)
    const postIdObject = ObjectId.createFromHexString(postId)
    const commentIdObject = ObjectId.createFromHexString(commentId)

    return db.users.findOne({ _id: userIdObject })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.findOne({ _id: postIdObject })
                .catch(error => { new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('Post not found')

            return db.posts.findOne({ _id: postIdObject, comments: { $elemMatch: { _id: commentIdObject } } })
                .catch(error => { new Error(error.message) })
        })
        .then(comment => {
            if (!comment) throw new Error('Comment not found')

            if (comment.author.toString() !== userIdObject.toString()) throw new Error('User is not author of comment')

            return db.posts.updateOne({ _id: postIdObject }, { $pull: { comments: { _id: commentIdObject } } })
                .catch(error => { new Error(error.message) })
        })
        .then(_ => { })
}