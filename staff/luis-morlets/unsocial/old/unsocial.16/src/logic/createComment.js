import uuid from '../data/uuid'
import { validate } from './helpers'

export default (text, postId) => {
    validate.text(text)
    validate.id(postId, 'postId')

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found');

    const comment = {
        id: uuid(),
        author: sessionStorage.userId,
        text,
        date: new Date,
    }

    post.comments.push(comment)

    localStorage.posts = JSON.stringify(posts)
}