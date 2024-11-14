import { models } from 'dat'
import { validate, errors } from 'com'

const { User, Post } = models
const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('User not found')
            if (!post) throw new NotFoundError('Post not found')

            const { saves } = post

            const index = saves.findIndex(userObjectId => userObjectId.equals(userId))

            if (index < 0)
                saves.push(userId)
            else
                saves.splice(index, 1)

            return post.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}