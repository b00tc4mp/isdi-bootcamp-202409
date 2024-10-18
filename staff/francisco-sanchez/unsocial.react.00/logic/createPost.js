const createPost = (userId, image, text) => {
    if (typeof userId !== 'string') throw new Error('invalid userId')
    if (typeof image !== 'string') throw new Error('invalid image')
    if (typeof text !== 'string') throw new Error('invalid text')

    let post = {
        id: postUuid(), //llama a la función para crear un id de post
        image: image,
        text: text,
        author: userId,
        date: new Date().toDateString() //Para mostrar la fecha un poco más corta
    }

    posts.push(post)
}
