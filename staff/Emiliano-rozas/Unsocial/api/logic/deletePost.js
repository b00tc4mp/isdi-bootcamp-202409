import db from 'dat'

import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const ObjectPostId = ObjectId.createFromHexString(postId)

    return db.users
        .findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch((error) => {
            new Error(error.message)
        })
        .then(user => {
            console.log(user)
            if (!user) throw new Error('User not found')

            return db.posts
                .findOne({ _id: ObjectPostId })
                .catch(error => {
                    throw new Error(error.message)
                })
                .then(post => {
                    if (!post) throw new Error('post not found')

                    const { author } = post

                    if (author.toString() !== userId) throw new Error('user is not author of post')

                    return db.posts.deleteOne({ _id: ObjectPostId })
                        .then((_) => { })
                        .catch(error => { throw new Error(error.message) })
                })
        })
}