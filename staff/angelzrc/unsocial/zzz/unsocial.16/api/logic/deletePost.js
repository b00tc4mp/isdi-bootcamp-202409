import { models } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError } = errors
const { User, Post } = models
export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([User.findById(userId).lean(), Post.findById(postId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')
            if (!post.author.equals(userId)) throw new OwnershipError('user is not author of post')


            return Post.deleteById(postId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}


