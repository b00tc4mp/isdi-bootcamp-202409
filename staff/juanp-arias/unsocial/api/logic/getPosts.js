import { storage } from "../data/index.js"

export default () => {
    const { users, posts } = storage

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }

        //post.liked = post.likes.includes(userI)

        post.comments = post.comments.length
    })

    storage.posts = posts
    return storage.posts.toReversed()
}