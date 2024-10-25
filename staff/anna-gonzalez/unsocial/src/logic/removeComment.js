import { validate } from './helpers'

export default (postId, commentId) => {
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    const { comments } = post

    const index = comments.findIndex(({ id }) => id === commentId)

    if (index < 0) throw new Error("Comment not found")

    const { author } = comments[index]

    if (author !== sessionStorage.userId) throw new Error("User is not author of comment")

    comments.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}