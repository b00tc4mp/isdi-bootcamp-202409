import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.findOne({ _id: ObjectId.createFromHexString(postId) })
                .catch(error => { new Error(error.message) })
                .then(post => {
                    if (!post) throw new Error('Post not found')

                    const { author } = post

                    if (author.toString() !== userId) throw new Error('User is not author of post')

                    return db.posts.deleteOne({ _id: ObjectId.createFromHexString(postId) })
                        .catch(error => { new Error(error.message) })
                })
        })
}