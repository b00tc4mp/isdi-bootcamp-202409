function deletePost(postId) {
    let posts = JSON.parse(localStorage.posts)

    let post = posts.findIndex(post => post.id === postId)

    posts.splice(post, 1)

    localStorage.posts = JSON.stringify(posts)
}

export default deletePost