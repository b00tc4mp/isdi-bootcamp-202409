import db from 'dat'

import { validate, errors } from 'apu'

const { SystemError, NotFoundError, OwnershipError } = errors

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectPostId = ObjectId.createFromHexString(postId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return db.posts.findOne({ _id: objectPostId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')

            const { author } = post

            if (author.toString() !== userId) throw new OwnershipError('user is not author of post')

            return db.posts.deleteOne({ _id: objectPostId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}