import { validate } from 'com'

export default (postId, callback) => {
    validate.image(postId, 'postId')
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

        callback(new Error(message))
    })

    xhr.open('GET', `http://localhost:8080/posts/${postId}/comments`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}