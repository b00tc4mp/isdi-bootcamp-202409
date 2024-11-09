//import { storage } from '../data/index.js'
import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default function getPosts(userId) {
    validate.id(userId, 'userId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.find({}).toArray() //Esto va a buscar todos los posts y los convierte en array
        })
        .then(posts => {
            if (!posts || posts.length === 0) throw new Error('posts not found')

            return posts.toReversed()
        })
        .catch(error => {
            new Error(error.message)

        })
}


// //const user = users.find(({ id }) => id === userId)
// const found = users.some(({ id }) => id === userId)
// //if (!user) throw new Error('user not found')
// if (!found) throw new Error('user not found')

// posts.forEach(post => {
//     //aquí va la lógica de del getPosts original

//     const { author: authorId } = post
//     const { username } = users.find(({ id }) => id === authorId)

//     post.author = { id: authorId, username }
//     post.liked = post.likes.includes(userId)
//     post.comments = post.comments.length