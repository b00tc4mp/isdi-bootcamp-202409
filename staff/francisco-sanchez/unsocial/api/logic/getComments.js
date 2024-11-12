import db from 'dat'

import { validate } from "./helpers/index.js";

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectPostId = ObjectId.createFromHexString(postId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.findOne({ _id: objectPostId })
                .catch(error => { throw new Error(error.message) })
        })

        .then(post => {
            if (!post) throw new Error('post not found')

            //TODO: Revisar lo de Manu y actualizarlo a lo manu
            /**
             * Nos traemos todos los id de autores
             * declaramos un array de autores
             * para cada comentario mirar el id del autor
             * De esta manera conseguimos que no tenga que buscar varias veces a cada autor en caso de eestar más de una vez
             * 
             * Luego podemos buscar todos los autores dentro de los posts, así evitamos buscar varias veces el nombre de usuario de un mismo autor
             * Tenemos que hacer una projection (((( ¡¡¡¡¡ Que no se que es y tengo que entender !!!!! ))))
             * 
             * Luego para cada usuario ....
             * 
             * 
             * 
             * ¿?¿?¿?¿?¿?
             * ¿?¿?¿
             * de la liniea 37 a la 51 de manu no entiendo nada! 
             * 
             * 
             * ...
             * 
             */

            const { comments } = post

            const promises = comments.map(comment => {
                return db.users.findOne({ _id: comment.author })
                    .catch(error => { throw new Error(error.message) })
                    .then(user => {
                        if (!user) throw new Error('author of comment not found')

                        const { username } = user

                        const { author: authorId } = comment

                        comment.id = comment._id.toString()
                        delete comment._id

                        comment.author = { id: authorId.toString(), username }

                        return comment
                    })
            })
            return Promise.all(promises)

        })

}