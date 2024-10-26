import { validate } from './helpers'

import uuid from '../data/uuid'

export default(postId, text) => {

    validate.id(postId, 'postId')
    validate.text(text)
 
    const posts = JSON.parse(localStorage.getItem('posts'))

    const post = posts.find(post =>
        post.id === postId
    )

    if (!post) throw new Error('Post not found')


    post.comments.push({
        id: uuid(),
        author: sessionStorage.userId,
        text,
        date: new Date
    })

    localStorage.posts = JSON.stringify(posts)
}