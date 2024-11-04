import { storage } from '../data/index.js'
import { validate } from './helpers/index.js'

export default userId => {
    validate.id(userId, 'userId')

    const { posts, users } = storage
    console.log(userId)

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }

        post.liked = post.likedBy.includes(userId)

        post.comments = post.comments.length
    });

    return posts.toReversed()
}