import { validate } from 'com'

export default (postId, text, callback) => {
    validate.id(postId, 'PostID')
    validate.text(text)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 201) {
            callback(null)
            return
        }

        const { error, message } = JSON.parse(response)
        callbaxck(new Error(message))
    })

    xhr.open('POST', `http://localhost:7070/posts/${postId}/comments`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify({ text }))
}