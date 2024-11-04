import validate from './helpers/validate.js'
import { storage } from '../data/index.js'

export default (userId, postId) => {
    validate.id(userId, 'user Id')
    validate.id(postId, 'post Id')

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)
    if (!found) throw new Error('user not found')

    const post = posts.find(({ id }) => id === postId)
    if (!post) throw new Error('post not found')

    const { comments } = post

    comments.forEach(comment => {
        const { author: authorId } = comment

        const { username } = users.find(({ id }) => id === authorId)

        comment.author = { id: authorId, username }
    })

    return comments
}