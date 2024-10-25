export default () => {
    const users = JSON.parse(localStorage.users)
    const posts = JSON.parse(localStorage.posts)

    const { userId } = sessionStorage

    posts.forEach(post => {
        const { author: authorId } = post

        //const user = users.find(user => user.id === authorId)
        //const user = users.find(({ id }) => id === authorId)
        const { username } = users.find(({ id }) => id === authorId)

        //post.author = { id: authorId, username: user.username }
        /* cuando el valor que devolvemos se llama igual que la variable 
        que queremos traspasar podemos evitar nombrarla y poner 
        directamente el valor de lo que vamos a devolver */
        post.author = { id: authorId, username }

        post.liked = post.likes.includes(userId)

        post.comments = post.comments.length
    })

    return posts.toReversed()
}

