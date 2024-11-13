import db from 'dat'
import { validate } from './helpers/index.js'
import { errors } from 'com'
import { models } from 'dat'

const { ObjectId } = db
const { SystemError, NotFoundError, OwnershipError } = errors
const { User, Post } = models


export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    return User.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const postObjectId = new ObjectId(postId)

            return Post.findOne({ _id: postObjectId })
                .then((post) => {
                    if (!post) throw new NotFoundError('post not found')
                    if (!post.author.equals(userId)) throw new OwnershipError('user is not author of post')

                    return Post.deleteOne({ _id: postObjectId })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then((_) => { })
        })
}