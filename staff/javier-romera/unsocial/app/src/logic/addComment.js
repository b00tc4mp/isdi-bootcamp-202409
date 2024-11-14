import { validate, errors } from 'apu'

const { SystemError } = errors

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

        const constructor = errors[error]

        callback(new constructor(message))
    })

    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    xhr.open('POST', `http://${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.loggedInUserId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ text }))
}