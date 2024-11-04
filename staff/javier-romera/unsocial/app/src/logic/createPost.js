import { validate } from './helpers'

export default (image, text, callback) => {
    validate.image(image)
    validate.text(text)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 201) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(response)

        callback(new Error(message))
    })

    xhr.open('POST', 'http://localhost:8080/posts')
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.loggedInUserId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(`{"image":"${image}","text":"${text}"}`)
}