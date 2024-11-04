import { validate } from './helpers'
import { storage, uuid } from '../data/index.js'


export default (postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)
    
    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)
    // Return error if user not found
    if (!found) throw new Error('user not found')

    const post = posts.find(({ id }) => id === postId)

    // Return error if post not found
    if (!post) throw new Error('post not found')

    // Extract the comments from the post and add the new comment
    const { comments } = post

    comments.push({
        id: uuid(),
        author: userId,
        text,
        date: new Date().toISOString()
    })

    storage.posts = posts
}