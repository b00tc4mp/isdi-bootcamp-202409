import validate from './helpers/validate.js'
import { storage, uuid } from '../data/index.js'

export default (postId, text, userId) => {
    validate.id(postId, 'postId')
    validate.text(text)
    if (text.length < 5) throw new Error('Comment is too short')
    if (text.length > 100) throw new Error('Comment is too long')

    const { posts } = storage

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    post.comments.push({
        id: uuid(),
        author: userId,
        text,
        date: new Date
    })

    storage.posts = posts
}