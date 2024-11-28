import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    const userIdObject = ObjectId.createFromHexString(userId)
    const postIdObject = ObjectId.createFromHexString(postId)

    return db.users.findOne({ _id: userIdObject })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.findOne({ _id: postIdObject })
                .catch(error => { new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('Post not found')

            return db.posts.updateOne({ _id: postIdObject },
                {
                    $push: {
                        comments: {
                            _id: new ObjectId,
                            author: userIdObject,
                            text,
                            date: new Date
                        }
                    }
                })
        })
        .then(_ => { })
}