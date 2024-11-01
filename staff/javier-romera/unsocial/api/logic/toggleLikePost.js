import { validate } from './helpers/index.js'
import { storage } from '../data/index.js'

export default (postId, userId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const { posts } = storage

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { likedBy } = post

    const index = likedBy.indexOf(userId)

    if (index < 0) likedBy.push(userId)
    else likedBy.splice(index, 1)

    storage.posts = posts
}