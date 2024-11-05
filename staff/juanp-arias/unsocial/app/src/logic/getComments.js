import { validate } from 'com'

export default postId => {
    validate.id(postId, 'PostID')

    const users = JSON.parse(localStorage.users)
    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { comments } = post

    comments.forEach(comment => {
        const { author: authorId } = comment

        const { username } = users.find(({ id }) => id === authorId)

        comment.author = { id: authorId, username }
    })

    return comments
}