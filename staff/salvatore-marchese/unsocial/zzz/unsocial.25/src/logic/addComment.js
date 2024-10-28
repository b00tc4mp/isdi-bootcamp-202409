import { validate } from './helpers'

import uuid from '../data/uuid'

export default (postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)

    // Get all the post 
    const posts = JSON.parse(localStorage.posts)

    // Retrieve the post
    const post = posts.find(({ id }) => id === postId)

    // Return error if post not found
    if (!post) throw new Error('post not found')

    // Extract the comments from the post and add the new comment
    const { comments=[] } = post;
    comments.push({
        id: uuid(),
        author: sessionStorage.userId,
        text,
        date: new Date
    })

    // Update the localstorage
    localStorage.posts = JSON.stringify(posts)
}