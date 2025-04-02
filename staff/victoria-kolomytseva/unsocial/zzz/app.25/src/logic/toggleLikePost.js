import { validate, errors } from 'com'

const { SystemError } = errors

export default (postId, callback) => {
    validate.id(postId, 'postId')
    validate.callback(callback)

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
    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    xhr.open('PATCH', `http://${import.meta.env.VITE_API_URL}/posts/${postId}/likes`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}