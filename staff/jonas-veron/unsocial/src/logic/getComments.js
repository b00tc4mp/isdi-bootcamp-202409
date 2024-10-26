import { validate } from './helpers'

export default postId => {
    validate.id(postId, 'postId')

    const users = JSON.parse(localStorage.users)
    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(post =>
        post.id === postId
)

        if (!post) throw new Error('Post not found')

        const { comments } = post

        comments.forEach(comment => {
            const { author: authorId } = comment

            const { username } = users.find(({ id }) => id === authorId)

            comment.author = { id: authorId, username }
        })

    return comments
}