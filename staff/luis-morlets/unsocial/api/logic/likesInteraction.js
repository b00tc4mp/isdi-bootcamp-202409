import { validate } from 'com'
import { storage } from '../data/index.js'

export default (userId, postId) => {
    validate.id(postId, 'postId')

    const { posts, users } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('Post not found')

    const { likedBy } = post

    const index = likedBy.indexOf(userId)

    if (index < 0) likedBy.push(userId)

    else likedBy.splice(index, 1)

    storage.posts = posts
}