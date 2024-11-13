import db from 'dat'
import { validate } from './helpers/index.js'
import { errors } from 'com'
import { models } from 'dat'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors
const { User, Post } = models


export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    return Promise.all([
        User.findOne({ _id: userObjectId }),
        Post.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { likes } = post

            const found = likes.some(userObjectId => userObjectId.equals(userId))

            if (found)
                return Post.updateOne({ _id: postObjectId }, { $pull: { likes: userObjectId } })
                    .catch(error => { throw new SystemError(error.message) })

            return Post.updateOne({ _id: postObjectId }, { $push: { likes: userObjectId } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}