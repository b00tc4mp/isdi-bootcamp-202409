export default postId => {
    const posts = JSON.parse(localStorage.posts)

    const index = posts.findIndex(({ id }) => id === postId)

    if (index < 0) throw new Error('Post not found')

    posts.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}