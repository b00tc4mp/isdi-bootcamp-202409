import { validate } from 'com'

import { storage, uuid } from '../data/index.js'

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('User not found')

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('Post not found')

    const { comments } = post

    comments.push({
        id: uuid(),
        author: userId,
        text,
        date: new Date().toISOString()
    })

    storage.posts = posts
}