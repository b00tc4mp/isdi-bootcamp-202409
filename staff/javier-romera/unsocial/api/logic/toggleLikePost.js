import db from 'dat'

import { validate, errors } from 'apu'

const { SystemError, NotFoundError } = errors

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
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { likedBy } = post

            const found = likedBy.some(id => id.equals(objectUserId))

            if (!found)
                return db.posts.updateOne({ _id: objectPostId }, { $push: { likedBy: objectUserId } })
                    .catch(error => { throw new SystemError(error.message) })

            return db.posts.updateOne({ _id: objectPostId }, { $pull: { likedBy: objectUserId } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}