import { validate } from 'com'

import { storage } from '../data/index.js'

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('User not found')

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('Post not found')

    const { saves } = post

    const index = saves.indexOf(userId)

    if (index < 0) saves.push(userId)
    else saves.splice(index, 1)

    storage.posts = posts
}