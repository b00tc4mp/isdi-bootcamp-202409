import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, status) => {
    validate.id(userId, 'userId')
    // si status = 'found' o vasio
    const query = status ? { status } : {};//query se usará para buscar registros basados en el estado (status) solo si este está definido

    return Promise.all([
        User.findById(userId).lean(), //.lean() convierte el resultado en un objeto JavaScript simple en lugar de un documento de Mongoose
        Post.find(query).populate('author', 'userId').sort({
            date: -1 // Ordena las publicaciones de forma descendente por fecha
        }).lean() //duevuelve el objeto simple
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, posts]) => {
            if (!user) throw new NotFoundError('user not found')

            posts.forEach(post => {
                post.id = post._id.toString()
                delete post._id

                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                }
                const { likes, comments } = post

                post.liked = likes.some(userObjectId => userObjectId.equals(userId))
                post.likes = likes.length

                post.comments = comments.length
            })

            return posts
        })
}