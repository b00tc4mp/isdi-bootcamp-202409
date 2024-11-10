import db from 'dat'

import { validate } from 'apu'

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    const objectUserId = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.find().toArray()
                .catch(error => { new Error(error.message) })
        })
        .then(posts => {
            return db.users.find().toArray()
                .catch(error => { new Error(error.message) })
                .then(users => {
                    posts.forEach(post => {
                        const { author: authorId, likedBy, comments } = post

                        const { username } = users.find(({ _id }) => _id.equals(authorId))

                        post.author = { _id: authorId, username }

                        post.liked = likedBy.some(id => id.equals(objectUserId))

                        post.comments = comments.length
                    })
                    return posts.toReversed()
                })
        })
}