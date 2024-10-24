export default (postId) => {
    let posts = JSON.parse(localStorage.posts)

    let post = posts.findIndex(post => post.id === postId)

    if (post < 0) throw new Error('Post not found')

    posts.splice(post, 1)

    localStorage.posts = JSON.stringify(posts)
}