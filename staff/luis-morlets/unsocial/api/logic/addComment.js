import { storage, uuid } from '../data/index.js'

import { validate } from './helpers/index.js'


export default (userId, postId, text) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')
    validate.text(text)

    const { posts, users } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    post.comments.push({
        id: uuid(),
        author: userId,
        text,
        date: new Date().toISOString
    })

    storage.posts = posts
}