import db from 'dat'

import { validate } from 'apu'

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    const objectUserId = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.find().sort({ date: -1 }).toArray()
                .catch(error => { throw new Error(error.message) })
        })
        .then(posts => {
            const promises = posts.map(post => {
                return db.users.findOne({ _id: post.author }, { username: 1 })
                    .catch(error => { throw new Error(error.message) })
                    .then(user => {
                        if (!user) throw new Error('author of post not found')

                        const { username } = user

                        const { author: authorId, likedBy, comments } = post

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
            return Promise.all(promises)
        })
}