export default (postId) => {
    const posts = JSON.parse(localStorage.posts)

    const index = posts.findIndex(post => {
        return post.id === postId
    })

    const comments = posts[index].comments

    return comments
}