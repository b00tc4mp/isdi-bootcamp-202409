import { storage } from '../data/index.js'

export default userId => {
    const { posts, users } = storage

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }

        post.liked = post.likedBy.includes(userId)

        post.comments = post.comments.length
    });

    return posts.toReversed()
}