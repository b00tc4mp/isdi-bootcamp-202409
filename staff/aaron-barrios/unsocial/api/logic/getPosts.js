import { storage } from '../data/index.js'
import validate from './helpers/validate.js'

export default userId => {
    validate.id(userId, 'userId')

    const { users, posts } = storage

    const user = users.find(user => user.id === userId)

    if (!user) throw new Error('user not found')

    posts.forEach(post => {
        const { author: authorId } = post

        //const user = users.find(user => user.id === authorId)
        //const user = users.find(({ id }) => id === authorId)
        const { username } = users.find(({ id }) => id === authorId)

        //post.author = { id: authorId, username: username }
        post.author = { id: authorId, username }

        post.liked = post.likes.includes(userId)

        post.comments = post.comments.length

    })

    return posts.toReversed()
}