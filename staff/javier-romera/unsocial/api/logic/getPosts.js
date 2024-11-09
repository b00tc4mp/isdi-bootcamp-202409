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

            return db.posts.find({}).toArray()
                .catch(error => { new Error(error.message) })
        })
        .then(posts => {
            posts.forEach(post => {
                const { author: authorId } = post

                post.liked = post.likedBy.includes(userId)

                post.comments = post.comments.length
            })
            return posts.toReversed()
        })
    const { username } = users.find(({ id }) => id === authorId)

    post.author = { id: authorId, username }
}