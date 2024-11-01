import validate from './helpers/validate.js'

import { storage, uuid } from '../data/index.js'

export default (userId, postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)
    validate.id(userId, 'userId')


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