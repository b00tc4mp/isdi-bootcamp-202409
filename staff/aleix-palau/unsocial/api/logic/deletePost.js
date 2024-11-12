import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return db.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            const postObjectId = new ObjectId(postId)

            return db.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new Error(error.message) })
                .then(post => {
                    if (!post) throw new Error('post not found')
                    if (!post.author.equals(userId)) throw new Error('user is not author of post')

                    return db.posts.deleteOne({ _id: postObjectId })
                        .catch(error => { throw new Error(error.message) })
                })
                .then(_ => { })
        })
}