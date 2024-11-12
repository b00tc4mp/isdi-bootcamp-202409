import db from 'dat'

import { validate, errors } from 'com'

const { NotFoundError, SystemError, OwnershipError } = errors

const { ObjectId } = db

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const ObjectUserId = ObjectId.createFromHexString(userId)
    const ObjectPostId = ObjectId.createFromHexString(postId)

    return Promise.all([
        db.users.findOne({ _id: ObjectUserId }),
        db.posts.findOne({ _id: ObjectPostId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            const comment = comments.find(({ _id }) => _id.equals(commentId))

            if (!comment) throw new NotFoundError('comment not found')

            const { author } = comment

            if (!author.equals(userId)) throw new OwnershipError('Tomatela flaco')

            return db.posts.updateOne({ _id: ObjectPostId }, { $pull: { comments: { _id: ObjectId.createFromHexString(commentId) } } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}           