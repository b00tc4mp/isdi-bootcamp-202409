import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default function getPosts(userId) {
    validate.id(userId, 'userId')

    //Primero evaluamos si existe el usuario en cuestión
    return db.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            //Buscamos los posts y los ordenamos por fecha de forma invertida
            return db.posts.find().sort({ date: -1 }).toArray()
                .catch(error => { throw new Error(error.message) }) //Esto va a buscar todos los posts y los convierte en array
        })
        //Si encuentra el usuario buecamos los posts
        .then(posts => {
            if (!posts || posts.length === 0) throw new Error('posts not found')

            const promises = posts.map(post =>
                db.users.findOne({ _id: post.author }, { username: 1 }) //projection
                    .then(user => {
                        if (!user) throw new Error('Author of the post not found')

                        const { username } = user

                        //Sanitize
                        post.id = post._id.toString()
                        delete post._id

                        post.author = { id: post.author.toString(), username }

                        const { likes, comments } = post

                        post.liked = likes.some(userObjectId => userObjectId.equals(userId))
                        post.likes = likes.length

                        post.comments = comments.length

                        return post
                    })
            )
            return Promise.all(promises)
        })
}
