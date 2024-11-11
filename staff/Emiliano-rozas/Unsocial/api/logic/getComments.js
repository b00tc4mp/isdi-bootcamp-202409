
import db from 'dat'

import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.findOne({ _id: ObjectId.createFromHexString(postId) })
                .catch(error => { new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('post not found')
            const { comments } = post

            const promises = comments.map(comment => {
                return db.users.findOne(
                    { _id: comment.author }
                    , { username: 1 })
                    .catch(error => { new Error(error.message) })
                    .then(user => {
                        if (!user) throw new Error("Quien te conoce papa?");

                        const { author: authorId } = comment

                        const { username } = user

                        comment.id = comment._id.toString()
                        delete comment._id

                        comment.author = { _id: authorId.toString(), username }

                        return comment
                    })
            })
            return Promise.all(promises)
        })


}