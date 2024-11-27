import { validate, errors }  from 'com'

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

        callback(new Error(message))
    })

    xhr.open('DELETE', `http://localhost:8080/posts/${postId}/comments/${commentId}`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}