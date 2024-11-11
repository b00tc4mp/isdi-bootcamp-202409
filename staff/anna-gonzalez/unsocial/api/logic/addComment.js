import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('Post not found')

            return db.posts.updateOne({ _id: postObjectId }, { $push: { comments: { _id: new ObjectId, author: userObjectId, text, date: new Date } } })
        })
        .then(_ => { })
}
