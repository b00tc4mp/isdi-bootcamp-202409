import { validate } from 'com'

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

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)
    xhr.addEventListener('error', () => callback(new SystemError('server error')))
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}