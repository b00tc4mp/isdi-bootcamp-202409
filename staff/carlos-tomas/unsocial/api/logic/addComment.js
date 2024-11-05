import { validate } from 'com'

import { storage, uuid } from '../data/index.js'

export default (userId, postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)
    validate.id(userId, 'userId')

    const { posts, users } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error("user not found");

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { comments } = post

    comments.push({
        id: uuid(),
        author: userId,
        text,
        date: new Date
    })

    storage.posts = posts
}
