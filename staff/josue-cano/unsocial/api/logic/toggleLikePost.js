import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([
        //lean los documentos son devueltos como objetos planos un objeto js sin mas 
        User.findById(userId).lean(),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

                //cons likes = post.likes
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