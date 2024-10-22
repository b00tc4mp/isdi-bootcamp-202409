const getPosts = () => {

    const posts = JSON.parse(localStorage.posts)
    const users = JSON.parse(localStorage.users)

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }
    });

    return posts.toReversed()
}

export default getPosts