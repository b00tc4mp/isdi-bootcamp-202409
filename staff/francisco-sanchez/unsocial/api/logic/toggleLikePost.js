import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    /*
    Modificaremos el return con un Promise.all para 
    evaluar el usuario y el post en una misma instancia
    */

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('Post not found')

            const { likes } = post

            const index = likes.findIndex(userObjectId => userObjectId.equals(userId))

            if (index < 0)
                likes.push(userId)
            else
                likes.splice(index, 1)

            return post.save()
                .catch(error => { throw new SystemError(error.message) })

        })
        .then(_ => { })

}