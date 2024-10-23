const getPosts = () => {
    const users = JSON.parse(localStorage.users)
    const posts = JSON.parse(localStorage.posts)

    const { loggedInUserId } = sessionStorage

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }

        post.liked = post.likedBy.includes(loggedInUserId)
    });

    return posts.toReversed()
}

export default getPosts