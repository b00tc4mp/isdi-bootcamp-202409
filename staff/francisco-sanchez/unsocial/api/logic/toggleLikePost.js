import db from 'dat'
import { validate } from './helpers/index.js'
//import { storage } from '../data/index.js'

const { ObjectId } = db

export default (userId, postId) => {

    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    //busco el usuario
    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            //Busco el post
            return db.posts.findOne({ _id: ObjectId.createFromHexString(postId) })
                .catch(error => { new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('post not found')

            //Si lo encuentro ya puedo poner el comentario
            //Pero primero debo saber si tiene like del usuario o todavía no lo tiene
            //Y lo verifico con la función some()
            //Devolverá true si lo encuentra y false si no 

            //const hasLiked = post.likes.includes(ObjectId.createFromHexString(userId))

            //Para poder comparar correctamente tenemos que pasar todos los likes a string, de lo contrario no los encuentra
            const hasLiked = post.likes.some(like => like.toString() === userId)

            //Para devolver el mensaje de lo que ha pasado
            const returnMessage = hasLiked ? 'Like removed' : 'Like added'

            //En el operador ternario asigno la operación a realizar, 
            //Si hasLiked = true lo quitará con pull
            //Si hasLiked = false lo añadirá con addToSet
            const toogleLikePost = hasLiked
                ? { $pull: { likes: ObjectId.createFromHexString(userId) } }
                : { $addToSet: { likes: ObjectId.createFromHexString(userId) } }


            //Y aquí hago el push en el array de comentarios
            return db.posts.updateOne(
                { _id: ObjectId.createFromHexString(postId) },
                toogleLikePost

            )
                .then(result => {
                    if (result.modifiedCount === 0) throw new Error('There was an error updating likes')

                    return { message: returnMessage }
                })
        })

        .catch(error => {
            throw new Error(error.message)
        })

}