import { models } from 'dat'

import { validate, errors } from 'com'

const { NotFoundError, SystemError, OwnershipError } = errors

const { User, Post } = models

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    return Promise.all([User.findById(userId), Post.findById(postId)])

        .catch((error) => { throw new SystemError(error.message) })

        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const comment = post.comments.id(commentId)

            if (!comment) throw new NotFoundError('comment not found')

            if (!comment.author.equals(userId))
                throw new OwnershipError('Tomatela flaco')

            comment.deleteOne({ _id: commentId })

            return post.save().catch((error) => {
                throw new SystemError(error.message)
            })
        })
        .then(_ => { })
}