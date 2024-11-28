import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([
        User.exists({ _id: userId }),
        Post.findById(postId)
            .populate('comments.author', 'username').lean()  // Ejecuta ambas operaciones de forma simultánea usando Promise.all
    ])

        .catch(error => { throw new SystemError(error.message) })

        // Si las promesas se cumplen, procesa los resultados
        .then(([userExists, post]) => {
            if (!userExists) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            comments.forEach(comment => {
                comment.id = comment._id.toString()
                delete comment._id

                const { author } = comment

                if (author._id) {
                    author.id = author._id.toString()
                    delete author._id
                }
            })
            return comments
        })
}