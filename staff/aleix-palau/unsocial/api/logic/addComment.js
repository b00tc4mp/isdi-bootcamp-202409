import db from 'dat'
import { models } from 'dat'

import { validate, errors } from 'com'

const { ObjectId } = db
const { User, Post } = models
const { SystemError, NotFoundError } = errors

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    const userObjectId = new ObjectId(userId) // ObjectId.createFromHexString(userId)
    const postObjectId = new ObjectId(postId) // ObjectId.createFromHexString(postId)

    return Promise.all([
        User.findOne({ _id: userObjectId }),
        Post.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const comment = {
                _id: new ObjectId,
                author: userObjectId,
                text,
                date: new Date
            }

            return Post.updateOne({ _id: postObjectId }, { $push: { comments: comment } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}