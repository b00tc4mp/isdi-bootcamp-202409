
export default (postId) => {
    let posts = JSON.parse(localStorage.posts)

    let post = posts.find(post =>
        post.id === postId
    )

    if (!post) {
        throw new Error('Post not')
    }

    return post.comments
}