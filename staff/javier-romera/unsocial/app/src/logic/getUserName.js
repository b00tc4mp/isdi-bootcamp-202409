import { validate, errors } from 'apu'
import { extractPayloadFromJWT } from '../util'

const { SystemError } = errors

export default callback => {
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            const userName = JSON.parse(response)

            callback(null, userName)

            return
        }

        const { error, message } = JSON.parse(response)

        const constructor = errors[error]

        callback(new constructor(message))
    })

    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    const { sub: userId } = extractPayloadFromJWT(localStorage.token)

    xhr.open('GET', `http://${import.meta.env.VITE_API_URL}/users/${userId}/name`)
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.token}`)
    xhr.send()
}