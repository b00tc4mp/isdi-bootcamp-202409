import { validate } from './helpers'

import uuid from '../data/uuid'

export default (postId, text, callback) => {
    validate.id(postId, 'postId')
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

        callback(new Error(message))
    })

    xhr.open('POST', `http://localhost:8080/posts/${postId}/comments`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify({ text }))
}