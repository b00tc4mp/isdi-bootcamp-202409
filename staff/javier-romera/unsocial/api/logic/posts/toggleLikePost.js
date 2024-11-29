import { User, Post } from 'dat'

import { validate, errors } from 'apu'

const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { likes } = post

            const index = likes.findIndex(id => id.equals(userId))

            if (index < 0)
                likes.push(userId)
            else
                likes.splice(index, 1)

            return post.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}