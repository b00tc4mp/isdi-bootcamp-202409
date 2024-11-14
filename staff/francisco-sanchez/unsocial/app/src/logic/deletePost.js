import { validate } from "com"

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
        const constructor = errirs[error]
        callback(new constructor(message))
    })

    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.addEventListener('error', () => callback(new SystemError('server error')))
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}