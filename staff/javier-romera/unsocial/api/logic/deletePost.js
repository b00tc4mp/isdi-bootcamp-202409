import { validate } from './helpers/index.js'

import { storage } from '../data/index.js'

export default (postId, userId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const { posts } = storage

    const index = posts.findIndex(({ id }) => id === postId)

    if (index < 0) throw new Error('post not found')

    const post = posts[index]

    const { author } = post

    if (author !== userId) throw new Error('user is not author of post')

    posts.splice(index, 1)

    storage.posts = posts
}