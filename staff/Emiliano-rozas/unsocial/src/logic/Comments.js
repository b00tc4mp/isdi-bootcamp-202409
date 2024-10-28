export default (postId) => {
    if (typeof postId !== 'string') throw new Error('Invalid postId')

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

}