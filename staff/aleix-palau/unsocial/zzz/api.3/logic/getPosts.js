import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    return db.users.findOne({ _id: new ObjectId(userId) }) // const objectUserId = ObjectId.createFromHexString(userId)
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.find().sort({ date: -1 }).toArray() // si no posem toArray(), va en BSON
                .catch(error => { throw new Error(error.message) })
        })
        .then(posts => {
            const promises = posts.map(post =>
                db.users.findOne({ _id: post.author }, { username: 1 }) // projection
                    .then(user => {
                        if (!user) throw new Error('author of post not found')

                        const { username } = user

                        // sanitize
                        post.id = post._id.toString() // pq no retorni sempre -> post._id. No volem barrejar data amb vista i no volem que se sàpiga que fem servir Mongo.
                        delete post._id

                        post.author = { id: post.author.toString(), username } // abans era post.author = ObjectId()

                        const { likes, comments } = post

                        post.liked = likes.some(userObjectId => userObjectId.equals(userId)) // com que són objectes, diferents referències, amb includes sempre sortiria -> false
                        post.likes = likes.length

                        post.comments = comments.length

                        return post // return del map
                    })
            )

            return Promise.all(promises)
        })
}