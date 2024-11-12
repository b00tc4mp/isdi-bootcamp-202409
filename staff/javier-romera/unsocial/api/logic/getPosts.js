import db from 'dat'

import { validate, errors } from 'apu'

const { ObjectId } = db

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    const objectUserId = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return db.posts.find().sort({ date: -1 }).toArray()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(posts => {
            const transformedPosts = posts.map(post => {
                return db.users.findOne({ _id: post.author }, { projection: { _id: 0, username: 1 } })
                    .catch(error => { throw new SystemError(error.message) })
                    .then(user => {
                        if (!user) throw new NotFoundError('author of post not found')

                        const { author: authorId, likedBy, comments } = post

                        const { username } = user

                        //sanitize
                        post.id = post._id.toString()
                        delete post._id

                        post.author = { id: authorId.toString(), username }

                        post.liked = likedBy.some(id => id.equals(userId))

                        post.likedBy = likedBy.length

                        post.comments = comments.length

                        return post
                    })
            })
            return Promise.all(transformedPosts)
        })
}