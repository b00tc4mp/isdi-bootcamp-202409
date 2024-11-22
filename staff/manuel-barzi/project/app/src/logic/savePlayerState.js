import { validate, errors } from 'com'
import { extractPayloadFromJWT } from '../util'

const { SystemError } = errors

export default (x, y, callback) => {
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

    const { sub: userId } = extractPayloadFromJWT(localStorage.token)

    xhr.open('PUT', `http://${import.meta.env.VITE_API_URL}/users/${userId}/state`)
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ x, y }))
}