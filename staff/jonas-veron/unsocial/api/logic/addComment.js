import { validate } from 'com'

import { storage, uuid } from '../data/index.js'

export default(userId, postId, text) => {

    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)
 
    const { posts } = storage

    const post = posts.find(post =>
        post.id === postId
    )
    if (!post) throw new Error('Post not found')


    post.comments.push({
        id: uuid(),
        author: userId,
        text,
        date: new Date
    })

    storage.posts = posts
}