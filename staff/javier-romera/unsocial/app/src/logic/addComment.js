import { validate } from './helpers'

import uuid from "../data/uuid"

export default (postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)
    if (text.length < 5) throw new Error('Comment is too short')
    if (text.length > 100) throw new Error('Comment is too long')

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    post.comments.push({
        id: uuid(),
        author: sessionStorage.loggedInUserId,
        text,
        date: new Date
    })

    localStorage.posts = JSON.stringify(posts)
}