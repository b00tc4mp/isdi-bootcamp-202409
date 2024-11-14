import { models } from 'dat'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

const { Post, User } = models

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([
        User.findById(userId),
        Post.findById(postId)
    ])
        .catch((error) => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('User not found')
            if (!post) throw new NotFoundError('post not found')

            const { likes } = post

            const liked = likes.some((userObjecId) => userObjecId.equals(userId))

            if (liked)
                return Post.updateOne({ _id: postId },
                    { $pull: { likes: userId } })
                    .catch(error => {
                        throw new SystemError(error.message)

                    })

            return Post.updateOne({ __id: postId },
                { $push: { likes: userId } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}


