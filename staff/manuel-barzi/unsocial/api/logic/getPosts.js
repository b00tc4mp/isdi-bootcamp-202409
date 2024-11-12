import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    return db.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.find().sort({ date: -1 }).toArray()
                .catch(error => { throw new Error(error.message) })
        })
        .then(posts => {
            const promises = posts.map(post =>
                db.users.findOne({ _id: post.author }, { projection: { username: 1 } }) // projection
                    .then(user => {
                        if (!user) throw new Error('author of post not found')

                        const { username } = user

                        // sanitize
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