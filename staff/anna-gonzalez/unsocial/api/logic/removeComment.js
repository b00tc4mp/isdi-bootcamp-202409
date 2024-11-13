import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    return Promise.all([
        db.users.findOne({ _id: userObjectId }),
        db.posts.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('User not found')
            if (!post) throw new NotFoundError('Post not found')

            const { comments } = post

            const comment = comments.find(({ _id }) => _id.equals(commentId))

            if (!comment) throw new NotFoundError('Comment not found')

            const { author } = comment

            if (!author.equals(userObjectId)) throw new OwnershipError('User is not author of comment')

            return db.posts.updateOne({ _id: postObjectId }, { $pull: { comments: { _id: new ObjectId(commentId) } } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}