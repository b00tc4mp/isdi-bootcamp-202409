import { models } from 'dat'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

const { Post, User } = models

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId)
    ])
        .catch((error) => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('User not found')
            if (!post) throw new NotFoundError('post not found')

            const { likes } = post

            const index = likes.findIndex(userObjecId => userObjecId.equals(userId))

            if (index < 0)
                likes.push(userId)
            else
                likes.splice(index, 1)

            return post.save().catch((error) => { throw new SystemError(error.message) })
        })
        .then(() => { })
}


