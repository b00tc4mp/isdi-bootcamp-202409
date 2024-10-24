export default (postId) => {
    if (typeof postId !== 'string') throw new Error('Invalid postId')

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('Post not found')

    const { saves } = post
    const { userId } = sessionStorage

    const index = saves.indexOf(userId)

    if (index < 0) saves.push(userId)
    else saves.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}