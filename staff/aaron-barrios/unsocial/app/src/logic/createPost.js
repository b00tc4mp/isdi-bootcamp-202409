import { validate } from './helpers'

import { errors } from '../../../com'

const { SystemError } = errors

export default (text, image, callback) => {
    validate.text(text)
    validate.image(image)
    validate.callback(callback)

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

    xhr.open('POST', `http://${import.meta.env.VITE_API_URL}/posts`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify({ text, image }))
}