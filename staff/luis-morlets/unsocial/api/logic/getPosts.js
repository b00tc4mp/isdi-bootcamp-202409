import { storage } from "../data"

export default () => {

    const { users, posts } = storage

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }

        post.liked = post.likedBy.includes(userId)

        delete post.comments
    })

    return posts.toReversed()
}