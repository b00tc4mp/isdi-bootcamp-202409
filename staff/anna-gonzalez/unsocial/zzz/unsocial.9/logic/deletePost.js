const deletePost = (post) => {
    const posts = JSON.parse(localStorage.posts)

    const index = posts.findIndex(element => {
        return element.id === post.id
    })

    posts.splice(index, 1)

    posts.toReversed()

    localStorage.posts = JSON.stringify(posts)
}