const getPosts = () => {

    const posts = JSON.parse(localStorage.posts)
    const users = JSON.parse(localStorage.users)

    const { userId } = sessionStorage

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }

        post.liked = post.likedBy.includes(userId)
    });

    return posts.toReversed()
}

export default getPosts