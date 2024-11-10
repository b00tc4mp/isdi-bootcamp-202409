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
                .catch(error => { new Error(error.message) }).catch(error => { new Error(error.message) })

        }).then(post => {
            if (!post) throw new Error('post not found')

            const { author } = post

            if (author.toString() !== userId) throw new Error('user is not author of post')

            return db.posts.deleteOne({ _id: ObjectId.createFromHexString(postId) })
        })
        .then(_ => { })
}