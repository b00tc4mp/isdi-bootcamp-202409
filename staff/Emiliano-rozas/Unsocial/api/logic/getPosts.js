import db from 'dat'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    const ObjectUserId = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: ObjectUserId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("User not found")

            return db.posts.find().sort({ date: -1 }).toArray()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(posts => {
            const promises = posts.map(post => db.users.findOne({ _id: post.author }, { username: 1 })

                .then(user => {
                    if (!user) throw new NotFoundError("Author post not found")


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
