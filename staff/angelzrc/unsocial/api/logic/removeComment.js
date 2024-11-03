import { validate } from './helpers/index.js'
import { storage } from '../data/index.js'

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const { posts } = storage

    const post = posts.find(({ id }) => id === postId)

    const { comments } = post

    const index = comments.findIndex(({ id }) => id === commentId)

    if (index < 0) throw new Error('comment not found')

    const { author } = comments[index]

    if (author !== userId) throw new Error('user is not author of comment')

    comments.splice(index, 1)

    storage.posts = posts
}