import db from 'dat'

import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId, text) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')
    validate.text(text)

    const ObjectUserId = ObjectId.createFromHexString(userId)
    const ObjectPostId = ObjectId.createFromHexString(postId)

    return db.users
        .findOne({ _id: ObjectUserId })
        .catch((error) => {
            new Error(error.message)
        })
        .then((user) => {
            if (!user) throw new Error('user not found')

            return db.posts
                .findOne({ _id: ObjectPostId })
                .catch((error) => {
                    new Error(error.message)
                })
                .then(post => {
                    if (!post) throw new Error('post not found')


                    return db.posts.updateOne({ _id: ObjectPostId }, { $push: { comments: { _id: new ObjectId, author: ObjectUserId, text, date: new Date() } } })
                })

        })

}