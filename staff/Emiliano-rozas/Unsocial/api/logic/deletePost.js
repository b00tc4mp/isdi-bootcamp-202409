import { models } from 'dat'

import { validate, errors } from 'com'

const { User, Post } = models

const { NotFoundError, SystemError, OwnershipError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    // const ObjectPostId = ObjectId.createFromHexString(postId)

    return User
        .findById(userId)
        .catch((error) => {
            throw new SystemError(error.message)
        })
        .then(user => {
            console.log(user)
            if (!user) throw new NotFoundError('User not found')

            return Post
                .findById(postId)
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    const { author } = post

                    if (author.toString() !== userId) throw new OwnershipError('user is not author of post')

                    return Post.deleteOne({ _id: postId })
                        .then((_) => { })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}