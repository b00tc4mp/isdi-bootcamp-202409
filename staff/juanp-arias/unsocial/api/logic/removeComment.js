import validate from './helpers/validate.js'
import { storage } from '../data/index.js'

export default (userId, postId, commentId) => {
    validate.id(userId, 'user Id')
    validate.id(postId, 'post Id')
    validate.id(commentId, 'comment Id')

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)
    if (!found) throw new Error('user not found')

    const post = posts.find(({ id }) => id === postId)
    if (!post) throw new Error('post not found')

    const { comments } = post

    const index = comments.findIndex(({ id }) => id === commentId)
    if (index < 0) throw new Error('comment not found')

    const { author } = comments[index]
    if (author !== userId) throw new Error('not your comment')

    comments.splice(index, 1)

    storage.posts = posts
}
