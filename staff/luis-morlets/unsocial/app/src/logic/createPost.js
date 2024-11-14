import { validate, errors } from 'com'

const { SystemError } = errors

export default (image, text, callback) => {
    validate.image(image)
    validate.text(text)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 201) {
            callback(null)

            return
        }
        const { error, message } = JSON.parse(response)

        const constructor = errors[error]

        callback(new constructor(message))

    })

    xhr.addEventListener('error', () => callback(new SystemError('Ups something happened, try again later')))

    xhr.open('POST', `http://${import.meta.env.VITE_API_URL}/posts`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send(JSON.stringify({ image, text }))
}