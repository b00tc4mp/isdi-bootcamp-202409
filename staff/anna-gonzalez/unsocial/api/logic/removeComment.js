import { models } from 'dat'
import { validate, errors } from 'com'

const { User, Post } = models
const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('User not found')
            if (!post) throw new NotFoundError('Post not found')

            const comment = post.comments.id(commentId)

            if (!comment) throw new NotFoundError('Comment not found')

            if (!comment.author.equals(userId)) throw new OwnershipError('User is not author of comment')

            comment.deleteOne({ _id: commentId })

            return post.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}