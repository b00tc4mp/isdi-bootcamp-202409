import { validate } from 'apu'
import { storage } from '../data/index.js'

export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found');

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { likedBy } = post

    const index = likedBy.indexOf(userId)

    if (index < 0)
        likedBy.push(userId)
    else
        likedBy.splice(index, 1)

    storage.posts = posts
}