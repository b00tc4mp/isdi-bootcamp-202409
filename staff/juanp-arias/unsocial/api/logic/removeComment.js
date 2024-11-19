import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId, commentId) => {
    validate.id(userId, 'user Id')
    validate.id(postId, 'post Id')
    validate.id(commentId, 'comment Id')

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const comment = post.comments.id(commentId)

            if (!comment) throw new NotFoundError('comment not found')

            if (!comment.author.equals(userId))
                throw new OwnershipError('not your comment')

            comment.deleteOne({ _id: commentId })

            return post.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}


