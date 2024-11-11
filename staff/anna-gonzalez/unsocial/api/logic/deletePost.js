import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return db.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            const postObjectId = new ObjectId(postId)

            return db.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new Error(error.message) })
                .then(post => {
                    if (!post) throw new Error('Post not found')
                    if (!post.author.equals(userId)) throw new Error('User is not author of post')

                    //const { author } = post
                    //if (author.toString() !== userId) throw new Error('User is not author of post')

                    return db.posts.deleteOne({ _id: postObjectId })
                        .catch(error => { throw new Error(error.message) })
                })
                .then(_ => { })
        })
}