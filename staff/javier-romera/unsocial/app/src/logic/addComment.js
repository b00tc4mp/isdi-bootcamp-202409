import { validate } from 'apu'

export default (postId, text, callback) => {
    validate.id(postId, 'postId')
    validate.text(text)
    validate.callback(callback)
    if (text.length < 5) throw new Error('Comment is too short')
    if (text.length > 100) throw new Error('Comment is too long')

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 201) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(response)

        callback(new Error(message))
    })

    xhr.open('POST', `http://localhost:8080/posts/${postId}/comments`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.loggedInUserId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ text }))
}