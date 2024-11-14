import { models } from 'dat'
import { validate, errors } from 'com'

const { User, Post } = models

const { NotFoundError, SystemError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')



    return Promise.all([
        User.findById(userId),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post nof found')

            const { likes } = post

            const found = likes.some(userObjectId => userObjectId.equals(userId))

            if (found)
                return Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
                    .catch(error => { throw new SystemError(error.message) })

            return Post.updateOne({ _id: postId }, { $push: { likes: userId } })
                .catch(error => { throw new SystemError(error.message) })

        })
        .then(_ => { })
}