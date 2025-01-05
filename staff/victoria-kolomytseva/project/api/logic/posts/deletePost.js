import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([User.findById(userId).lean(), Post.findById(postId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            return Post.deleteById(postId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
