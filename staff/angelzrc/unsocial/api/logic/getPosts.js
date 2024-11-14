import db from 'dat'
import { validate, errors } from 'com'
import { models } from 'dat'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors
const { User, Post } = models

export default userId => {
    validate.id(userId, 'userId')

    return User.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find().sort({ date: -1 }).toArray()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(posts => {
            const promises = posts.map(post =>
                User.findOne({ _id: post.author }, { projection: { username: 1 } })
                    .then(user => {
                        if (!user) throw new NotFoundError('author of post not found')

                        const { username } = user

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