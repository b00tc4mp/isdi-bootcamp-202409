import db from 'dat'
import { models } from 'dat'

import { validate, errors } from 'apu'

const { SystemError, NotFoundError } = errors
const { User, Post } = models
const { ObjectId } = db

export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const objectUserId = new ObjectId(userId)
    const objectPostId = new ObjectId(postId)

    return Promise.all([
        User.findOne({ _id: objectUserId }),
        Post.findOne({ _id: objectPostId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { likes } = post

            const found = likes.some(id => id.equals(userId))

            if (!found)
                return Post.updateOne({ _id: objectPostId }, { $push: { likes: objectUserId } })
                    .catch(error => { throw new SystemError(error.message) })

            return Post.updateOne({ _id: objectPostId }, { $pull: { likes: objectUserId } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}