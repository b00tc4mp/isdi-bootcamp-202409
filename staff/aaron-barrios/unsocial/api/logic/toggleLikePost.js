import { storage } from '../data/index.js'
import { validate } from './helpers/index.js'

export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')


    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { likes } = post

    const index = likes.indexOf(userId)

    if (index < 0) likes.push(userId)
    else likes.splice(index, 1)

    storage.posts = posts
}
