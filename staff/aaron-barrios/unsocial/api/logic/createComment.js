import db from 'dat'
import { validate } from './helpers/index.js'
import { errors } from 'com'
import { models } from 'dat'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors
const { User, Post } = models


export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)


    return Promise.all([
        User.findOne({ _id: userObjectId }),
        Post.findOne({ _id: postObjectId }),
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