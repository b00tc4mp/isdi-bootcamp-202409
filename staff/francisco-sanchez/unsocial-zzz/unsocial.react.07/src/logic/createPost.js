import uuid from '../data/uuid'

const createPost = (image, text) => {
    if (typeof image !== 'string') throw new Error('invalid image')
    if (typeof text !== 'string') throw new Error('invalid text')

    //Recuperamos el array de posts de la memoria del navegador
    const posts = JSON.parse(localStorage.posts)

    let post = {
        id: uuid(), //llama a la función para crear un id de post
        image: image,
        text: text,
        author: sessionStorage.userId,
        date: new Date().toDateString(), //Para mostrar la fecha un poco más corta
        likes: []
    }

    //Pusheamos el nuevo post
    posts.push(post)

    //Y volvemos a actualizar el array de posts de la memoria
    localStorage.posts = JSON.stringify(posts)
}

export default createPost