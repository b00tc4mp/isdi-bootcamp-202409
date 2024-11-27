export default (postId, commentId) => {
    if (typeof postId !== 'string') throw new Error('invalid postId')
    if (typeof commentId !== 'string') throw new Error('invalid commentId')

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    const { comments } = post

    const index = comments.findIndex(({ id }) => id === commentId)

    if (index < 0) throw new Error('comment not found')

    const { author } = comments[index]

    if (author !== sessionStorage.userId) throw new Error('user is not author of comment')

    comments.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}