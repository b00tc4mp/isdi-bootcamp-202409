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

    xhr.open('DELETE', `http://localhost:7070/posts/${postId}`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}
//función deletePost para eliminar los posts que queremos, le estamos dando funcionalidad a el botón delete