// Crear la logic de AddComment y poner en el index
import db from 'dat'
import { validate, errors } from 'com'
//import { storage, uuid } from '../data/index.js'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    //busco el usuario
    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            //Busco el post
            return db.posts.findOne({ _id: postObjectId })
                .catch(error => { new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')

            //Si lo encuentro creo el comentario en un nuevo objeto
            const newComment = {
                //Como el push no va a crear un id lo tengo que crear yo
                _id: new ObjectId(),
                author: userObjectId,
                text: text,
                date: new Date()
            }

            //Y aquí hago el push en el array de comentarios
            return db.posts.updateOne(
                { _id: ObjectId.createFromHexString(postId) },
                { $push: { comments: newComment } }
            )
        })
        .then(_ => { })
}





/* const { users, posts } = storage

const found = users.some(({ id }) => id === userId)

if (!found) throw new Error('user not found')

const post = posts.find(({ id }) => id === postId)

if (!post) throw new Error('post not found')

const { comments } = post

comments.push({
    id: uuid(),
    author: userId,
    text,
    date: new Date().toISOString()
})

storage.posts = posts */
