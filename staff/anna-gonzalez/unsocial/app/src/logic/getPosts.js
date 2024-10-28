export default () => {
    const users = JSON.parse(localStorage.users)
    const posts = JSON.parse(localStorage.posts)

    const { userId } = sessionStorage

    posts.forEach(post => {
        const { author: authorId } = post

        //const user = users.find(user => user.id === authorId)
        //const user = users.find(({ id }) => id === authorId)
        const { username } = users.find(({ id }) => id === authorId)

        //post.author = { id: authorId, username: username }
        post.author = { id: authorId, username }

        post.liked = post.likes.includes(userId)

        post.saved = post.saves.includes(userId)
        //enseñar solo los q post.saved sea true

        post.comments = post.comments.length //we do not need to charge all the comments yet, we are going to do that when we click on the view comments icon
        //remember that by doing this we are not modifying the localStorage
    })

    return posts.toReversed()
}