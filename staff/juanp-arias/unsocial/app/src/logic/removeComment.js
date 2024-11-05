import { validate } from 'com'

export default (postId, commentId) => {
    validate.id(postId, 'Post ID')
    validate.id(commentId, 'Comment ID')

    const posts = JSON.parse(localStorage.posts)
    const post = posts.find(({ id }) => id === postId)

    const { comments } = post

    const index = comments.findIndex(({ id }) => id === commentId)

    if (index < 0) throw new Error('comment not found')

    const { author } = comments[index]

    if (author !== sessionStorage.userId) throw new Error('not your post')

    comments.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}
