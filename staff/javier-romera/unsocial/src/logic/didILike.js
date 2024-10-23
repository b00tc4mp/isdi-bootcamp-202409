function didILike(post, id) {
    const posts = JSON.parse(localStorage.posts)

    const index = post.likedBy.findIndex(element => {
        return element === id
    })

    const postIndex = posts.findIndex(element => {
        return element === post
    })

    if (!index) {
        post.likedBy.push()
    } else {
        post.likedBy.splice(index, 1)
    }

    posts[postIndex] = post

    posts.toReversed()

    localStorage.posts = JSON.stringify(posts)

    return index
}

export default didILike