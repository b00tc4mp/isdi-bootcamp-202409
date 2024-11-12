import db from 'dat'
import { validate, errors } from 'com'
//import { storage } from '../data/index.js'

const { ObjectId } = db
const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId) => {

    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    /*
    Modificaremos el return con un Promise.all para 
    evaluar el usuario y el post en una misma instancia
    */

    return Promise.all([
        db.users.findOne({ _id: userObjectId }),
        db.posts.findOne({ _id: postObjectId })
    ])

        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('Post not found')

            const { likes } = post

            const found = likes.some(userObjectId => userObjectId.equals(userId))

            if (found)
                return db.posts.updateOne({ _id: postObjectId }, { $pull: { likes: userObjectId } })
                    .catch(error => { throw new SystemError(error.message) })

            return db.posts.updateOne({ _id: postObjectId }, { $push: { likes: userObjectId } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })

}


/*     return db.users.findOne({ _id: ObjectId.createFromHexString(userId) }) // _id: new ObjectId(userId) ¿?¿?¿?¿?
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

            const { likes } = post

            //Para poder comparar correctamente tenemos que pasar todos los likes a string, de lo contrario no los encuentra
            //const hasLiked = post.likes.some(like => like.toString() === userId)
            const hasLiked = likes.some(userObjectId => UserObjectId)

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

} */