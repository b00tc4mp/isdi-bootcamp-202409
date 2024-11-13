import db from 'dat'

import { validate, errors } from 'com'

const { ObjectId } = db

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const userObjectId = ObjectId.createFromHexString(userId)
    const postObjectId = ObjectId.createFromHexString(postId)
    const commentObjectId = ObjectId.createFromHexString(commentId)

    return Promise.all([
        db.users.findOne({ _id: userObjectId }),
        db.posts.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError("user not found")
            if (!post) throw new NotFoundError("post not found")

            const { comments } = post

            const comment = comments.find(comment => comment._id.equals(commentId))

            if (!comment) throw new NotFoundError("comment not found")

            const { author } = comment

            if (!author.equals(userId)) {
                throw new OwnershipError("user is not author")
            }
            return db.posts.updateOne({ _id: postObjectId },
                {
                    $pull: {
                        comments: { _id: commentObjectId },
                    },
                }
            )
                .catch(error => { throw new SystemError(error.message) })
                .then(_ => { })
        })
}