import { validate } from 'com'

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
        callback(new Error(message))
    })

    xhr.open('DELETE', `http://localhost:7070/posts/${postId}`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}
//función deletePost para eliminar los posts que queremos, le estamos dando funcionalidad a el botón delete