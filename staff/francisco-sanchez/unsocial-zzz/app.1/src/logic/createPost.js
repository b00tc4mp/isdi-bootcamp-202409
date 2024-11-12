import validate from './helpers/validate'

import uuid from '../data/uuid'

export default (image, text) => {
    validate.image(image)
    validate.text(text)

    //Recuperamos el array de posts de la memoria del navegador
    const posts = JSON.parse(localStorage.posts)

    let post = {
        id: uuid(), //llama a la función para crear un id de post
        image: image,
        text: text,
        author: sessionStorage.userId,
        date: new Date(),
        likes: [],
        comments: []
        //comments: {authorID, comment}
    }

    //Pusheamos el nuevo post
    posts.push(post)

    //Y volvemos a actualizar el array de posts de la memoria
    localStorage.posts = JSON.stringify(posts)
}