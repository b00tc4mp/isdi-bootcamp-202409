import { validate, errors } from 'apu'

const { SystemError } = errors

export default (postId, commentId, callback) => {
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')
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

    xhr.open('DELETE', `http://${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.token}`)
    xhr.send()
}