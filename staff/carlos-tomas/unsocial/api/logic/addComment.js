import db from 'dat'

import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)
    validate.id(userId, 'userId')

    return db.users.findOne()

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error("user not found");

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { comments } = post

    comments.push({

        author: userId,
        text,
        date: new Date
    })


}
