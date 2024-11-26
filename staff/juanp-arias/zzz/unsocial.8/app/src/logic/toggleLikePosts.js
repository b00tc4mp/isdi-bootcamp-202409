import { validate } from 'com'

export default (postId, callback) => {
    validate.id(postId, 'post Id')
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

    xhr.open('PATCH', `http://localhost:7070/posts/${postId}/likes`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}
