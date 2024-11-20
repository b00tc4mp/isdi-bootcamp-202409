import { validate, errors } from 'com'

const { SystemError } = errors

export default (postId, callback) => {
    validate.callback(callback)
    validate.id(postId, 'postId')

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 204) {
            callback(null)

            return
        }
        const { error, message } = JSON.parse(response)

        const constructor = errors[error]

        callback(new constructor(message))

    })

    xhr.addEventListener('error', () => callback(new SystemError('Ups something happened, try again later')))

    xhr.open('DELETE', `http://${import.meta.env.VITE_API_URL}/posts/${postId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}