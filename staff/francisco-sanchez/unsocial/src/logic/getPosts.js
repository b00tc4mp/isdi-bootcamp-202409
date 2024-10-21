const getPosts = () => {
    const posts = JSON.parse(localStorage.posts)

    return posts.toReversed()
}

export default getPosts