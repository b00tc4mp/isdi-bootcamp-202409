import { validate } from 'com';

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

    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`)
    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    //xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}