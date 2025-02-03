export default (id) => {
    const posts = JSON.parse(localStorage.posts)
    const post = posts.find(({ id }) => id === postId)
}