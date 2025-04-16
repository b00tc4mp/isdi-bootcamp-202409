//import validate from './helpers/validate'
import { validate } from 'com'

//import uuid from '../data/uuid'



export default (image, text, callback) => {
    validate.image(image)
    validate.text(text)
    validate.callback(callback)



    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        //console.log(xhr.status, xhr.response)
        const { status, response } = xhr

        if (status === 201) {
            callback(null)
            return
        }

        const { error, message } = JSON.parse(response)
        const constructor = errors[error]
        callback(new Error(message))
    })

    xhr.open('POST', 'http://localhost:8080/posts')
    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ image, text }))


    //xhr.send('{"image":"https://plus.unsplash.com/premium_photo-1695582638376-bd4ab9c3d9bd?q=80&w=2985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","text":"Buuuuuuuuuuuuuu!"}')


    // //Recuperamos el array de posts de la memoria del navegador
    // const posts = JSON.parse(localStorage.posts)

    // let post = {
    //     id: uuid(), //llama a la función para crear un id de post
    //     image: image,
    //     text: text,
    //     author: sessionStorage.userId,
    //     date: new Date(),
    //     likes: [],
    //     comments: []
    //     //comments: {authorID, comment}
    // }

    // //Pusheamos el nuevo post
    // posts.push(post)

    // //Y volvemos a actualizar el array de posts de la memoria
    // localStorage.posts = JSON.stringify(posts)
}