export default postId => {
    const posts = JSON.parse(localStorage.posts)

    const index = posts.findIndex(({ id }) => id === postId)

    if (index < 0) throw new Error('post not found')

    const { author } = posts[index]

    if (author !== sessionStorage.userId) throw new Error('user is not the owner of the post')

    posts.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}