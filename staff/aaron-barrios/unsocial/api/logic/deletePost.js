import { validate } from './helpers/index.js'
import { errors } from 'com'
import { models } from 'dat'

const { User, Post } = models
const { SystemError, NotFoundError, OwnershipError } = errors


export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')
            if (!post.author.equals(userId)) throw new OwnershipError('user is not author of post')

            return Post.deleteById(postId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then((_) => { })
}