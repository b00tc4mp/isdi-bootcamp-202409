import { storage } from '../data/index.js'
import validate from './helpers/validate.js'

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const { posts } = storage

    const index = posts.findIndex(({ id }) => id === postId)

    if (index < 0) throw new Error('post not found')

    const post = posts[index]

    const { author } = post
    if (author !== userId) throw new Error('not your post')

    posts.splice(index, 1)

    storage.posts = posts
}