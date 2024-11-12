import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId, commentId) => {
    validate.id(userId, 'user Id')
    validate.id(postId, 'post Id')
    validate.id(commentId, 'comment Id')

    const objectUserId = new ObjectId(userId)
    const objectPostId = new ObjectId(postId)
    const objectCommentId = new ObjectId(commentId)

    return Promise.all([
        db.users.findOne({ _id: objectUserId }),
        db.posts.findOne({ _id: objectPostId }),
    ])
        .catch(error => { throw new SystemError(error.mesage) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post
            const found = comments.some(comment => comment._id.equals(objectCommentId))
            if (!found) throw new NotFoundError('comment not found')

            const comment = post.comments.find(comment => comment.author.toString() === objectUserId.toString())
            if (!comment || comment.author.toString() !== objectUserId.toString()) {
                throw new OwnershipError('not your comment')
            }

            return db.posts.updateOne({ _id: objectPostId }, { $pull: { comments: { _id: objectCommentId } } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}

