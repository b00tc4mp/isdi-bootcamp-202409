import { storage } from '../data/index.js'

export default () => {

    const { users, posts } = storage

    const { userId } = users

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }

        post.liked = post.likes.includes(userId)

        post.comments = post.comments.length
    })

    return posts.toReversed()
}