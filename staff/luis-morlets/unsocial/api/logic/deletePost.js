import { models } from 'dat'
import { validate, errors } from 'com'

const { User, Post } = models
const { SystemError, OwnershipError, NotFoundError } = errors

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
            if (!post.author.equals(userId)) { throw new OwnershipError('User is not author of this post') }

            return Post.deleteById(postId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}