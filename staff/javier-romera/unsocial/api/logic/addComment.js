import db from 'dat'
import { models } from 'dat'

import { validate, errors } from 'apu'

const { ObjectId } = db
const { User, Post } = models
const { SystemError, NotFoundError } = errors

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

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

            const comment = {
                _id: new ObjectId,
                author: objectUserId,
                text,
                date: new Date
            }

            return Post.updateOne({ _id: objectPostId }, { $push: { comments: comment } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}