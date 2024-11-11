import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    return db.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.find().sort({ date: -1 }).toArray()
                .catch(error => { throw new Error(error.message) })
        })
        .then(posts => {
            const promises = posts.map(post => {//si no hay llaves es q devuelvo una promesa
                return db.users.findOne({ _id: post.author }, { username: 1 }) //projection, cuando solo quieres algunos datos
                    .catch(error => { throw new Error(error.message) })
                    .then(user => { //{ _id, username } es más óptima la búsqueda porq manejamos menos datos con la db
                        if (!user) throw new Error('Author of post not found')

                        const { username } = user

                        const { author: authorId, likes, saves, comments } = post

                        //sanitize
                        post.id = post._id.toString()
                        delete post._id

                        post.author = { id: authorId.toString(), username }

                        post.liked = likes.some(userObjectId => userObjectId.equals(userId)) //includes es para primitivos. los objects parecen iguales pero ocupan diferentes espacios en la memoria
                        post.likes = likes.length

                        post.saved = saves.some(userObjectId => userObjectId.equals(userId))
                        post.saves = saves.length

                        post.comments = comments.length

                        return post
                    })
            })

            return Promise.all(promises)
        })
}