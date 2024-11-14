import { models } from 'dat'

import { validate, errors } from 'com'


const { User, Post } = models
const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findById(userId)
        .catch(error => { new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId)
                .catch(error => { new SystemError(error.message) })
        })
        .then(post => {
            if (!post) throw new NotFoundError('post not found');

            const { author } = post

            if (author.toString() !== userId) throw new OwnershipError('user is not author of post');

            return Post.deleteOne({ _id: postId })
        })
        .then(_ => { })
}


