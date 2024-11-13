import db from 'dat'
import { models } from 'dat'

import { validate, errors } from 'apu'

const { SystemError, NotFoundError, OwnershipError } = errors
const { User, Post } = models
const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const objectUserId = new ObjectId(userId)
    const objectPostId = new ObjectId(postId)

    return User.findOne({ _id: objectUserId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findOne({ _id: objectPostId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')

            const { author } = post

            if (author.toString() !== userId) throw new OwnershipError('user is not author of post')

            return Post.deleteOne({ _id: objectPostId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}