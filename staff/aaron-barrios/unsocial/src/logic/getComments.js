export default (postId) => {
    const posts = JSON.parse(localStorage.posts)
    const post = posts.find(({ id }) => id === postId)

    let comments = post.comments

    return comments
}