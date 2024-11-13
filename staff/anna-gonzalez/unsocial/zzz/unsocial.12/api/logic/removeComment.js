import { validate } from 'com'

import { storage } from '../data/index.js'

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('User not found')

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('Post not found')

    const { comments } = post

    const index = comments.findIndex(({ id }) => id === commentId)

    if (index < 0) throw new Error('Comment not found')

    const { author } = comments[index]

    if (author !== userId) throw new Error('User is not author of comment')

    comments.splice(index, 1)

    storage.posts = posts
}