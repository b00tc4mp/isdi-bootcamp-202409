import { validate } from "./helpers"

export default postId => {
    validate.id(postId, 'postId')

    const users = JSON.parse(localStorage.users)/*, JSON.parse es esencial para trabajar con datos almacenados en localStorage*/
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
