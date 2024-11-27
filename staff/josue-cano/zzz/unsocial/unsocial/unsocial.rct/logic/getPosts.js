const getPosts = () => {
    const posts = JSON.parse(localStorage.getItem("posts"))

    return posts.toReversed()
}