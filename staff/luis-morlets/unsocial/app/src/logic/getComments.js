import { validate, errors } from 'com'

const { SystemError } = errors

export default (postId, callback) => {
    validate.id(postId, 'postId')
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            const comments = JSON.parse(response)

            callback(null, comments)

            return
        }
        const { error, message } = JSON.parse(response)

        const constructor = errors[error]

        callback(new constructor(message))

    })

    xhr.addEventListener('error', () => callback(new SystemError('Ups something happened, try again later')))

    xhr.open('GET', `http://${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.token}`)
    xhr.send()
}