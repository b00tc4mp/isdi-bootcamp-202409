import { User, Post, Comment } from 'dat'
import { validate, errors } from 'com'


const { SystemError, NotFoundError } = errors

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    //busco el usuario
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            //Busco el post
            return Post.findById(postId)
                .catch(error => { new SystemError(error.message) })
        })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')

            //Si lo encuentro creo el comentario en un nuevo objeto
            const comment = new Comment({
                //Como el push no va a crear un id lo tengo que crear yo
                author: userId,
                text: text,
                date: new Date
            })

            //Y aquí hago el push en el array de comentarios
            post.comments.push(comment)

            return post.save()
                .catch(error => { throw new SystemError(error.message) })

        })
        .then(_ => { })
}