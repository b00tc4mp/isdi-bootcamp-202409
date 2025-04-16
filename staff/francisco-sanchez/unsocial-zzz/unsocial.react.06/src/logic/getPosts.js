const getPosts = () => {
    const posts = JSON.parse(localStorage.posts)
    //Modificamos la función para que nos devuelva también el nombre de usuario
    const users = JSON.parse(localStorage.users)


    posts.forEach(post => {
        const { author: authorId } = post

        const user = users.find(user => user.id === authorId)
        //const user = users.find(({ id }) => id === authorId)
        //const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username: user.username }
        /* cuando el valor que devolvemos se llama igual que la variable 
        que queremos traspasar podemos evitar nombrarla y poner 
        directamente el valor de lo que vamos a devolver */
        //post.author = { id: authorId, username }
    })

    return posts.toReversed()
}

export default getPosts