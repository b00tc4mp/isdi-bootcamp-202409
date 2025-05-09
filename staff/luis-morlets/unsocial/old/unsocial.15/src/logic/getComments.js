export default postId => {
    if (typeof postId !== 'string') throw new Error('invalid postID')

    //Nos traemos los usuarios y posts
    const users = JSON.parse(localStorage.users)
    const posts = JSON.parse(localStorage.posts)

    //Se usa el metodo find para conseguir y hacer coincidir el post con su id
    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found');

    const { comments } = post

    //Ahora usamos un forEach para en cada comentario extraer el id del comentario y el usuario
    comments.forEach(comment => {
        const { author: authorId } = comment

        //Usamos el find para tambien buscar que el id del comentario coincida con el del autor,
        //convertirlo en un objeto que nos permita usar o el id o el nombre de usuario mas que nada al momento de la vista
        const { username } = users.find(({ id }) => id === authorId)

        comment.author = { id: authorId, username }
    })

    return comments
}