import db from 'dat'

import { validate, errors } from 'apu'

const { ObjectId } = db
const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectPostId = ObjectId.createFromHexString(postId)
    const objectCommentId = ObjectId.createFromHexString(commentId)

    return Promise.all([
        db.users.findOne({ _id: objectUserId }),
        db.posts.findOne({ _id: objectPostId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            const comment = comments.find(({ _id }) => _id.equals(objectCommentId))

            if (!comment) throw new NotFoundError('comment not found')

            const { author: authorId } = comment

            if (!authorId.equals(userId)) throw new OwnershipError('user is not author of comment')

            return db.posts.updateOne({ _id: objectPostId }, { $pull: { comments: { _id: objectCommentId } } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}