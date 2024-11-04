import { storage } from '../data/index.js'
import { validate } from './helpers/index.js'

export default userId => {
    /*
    el userId es importante para aquellos posts privados y para asegurarme de si he hecho like/save o no
    */
    validate.id(userId, 'userId')

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('User not found')

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }

        post.liked = post.likes.includes(userId)

        post.saved = post.saves.includes(userId)

        post.comments = post.comments.length
    })

    return posts.toReversed()
}