import { validate } from './helpers/index.js'
import { storage } from '../data/index.js'

export default (postId, userId) => {
    validate.id(postId, 'PostID')
    validate.id(userId, 'userId')

    const { posts } = storage

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { likes } = post

    const index = likes.indexOf(userId)

    if (index < 0) likes.push(userId)
    else likes.splice(index, 1)

    storage.posts = posts
}
