import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return db.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return db.posts.find().sort({ date: -1 }).toArray()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(posts => {
            const promises = posts.map(post => {
                return db.users.findOne({ _id: post.author }, { username: 1 }) //projection, cuando solo quieres algunos datos
                    .catch(error => { throw new SystemError(error.message) }) //x si falla mongo
                    .then(user => { //{ _id, username } es más óptima la búsqueda porq manejamos menos datos con la db
                        if (!user) throw new NotFoundError('Author of post not found')

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