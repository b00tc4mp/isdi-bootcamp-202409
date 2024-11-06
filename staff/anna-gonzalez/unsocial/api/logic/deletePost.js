import { validate } from 'com'

import { storage } from '../data/index.js'

export default (userId, postId) => { //todo el rato validemos el userId para añadir capas d seguridad
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('User not found')

    const index = posts.findIndex(({ id }) => id === postId)

    if (index < 0) throw new Error('Post not found')

    const post = posts[index]

    const { author } = post

    if (author !== userId) throw new Error('User is not author of post')

    posts.splice(index, 1)

    storage.posts = posts
}