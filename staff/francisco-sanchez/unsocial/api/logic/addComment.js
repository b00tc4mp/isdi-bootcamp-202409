// Crear la logic de AddComment y poner en el index
import db from 'dat'
import { validate } from './helpers/index.js'
//import { storage, uuid } from '../data/index.js'

const { ObjectId } = db

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

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

            //Si lo encuentro creo el comentario en un nuevo objeto
            const newComment = {
                //Como el push no va a crear un id lo tengo que crear yo
                _id: new ObjectId(),
                author: ObjectId.createFromHexString(userId),
                text: text,
                date: new Date()
            }

            //Y aquí hago el push en el array de comentarios
            return db.posts.updateOne(
                { _id: ObjectId.createFromHexString(postId) },
                { $push: { comments: newComment } }
            )
        })
        .then(result => {
            if (result.modifiedCount === 0) throw new Error('There was an error updating post comments')

            return { message: 'Comment added successfully' }
        })
        .catch(error => {
            throw new Error(error.message)
        })

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
