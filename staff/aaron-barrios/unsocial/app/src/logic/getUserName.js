import { errors, validate } from 'com'
import { extractPayload } from '../util'

const { SystemError } = errors

export default callback => {
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            const name = JSON.parse(response)

            callback(null, name)

            return
        }

        const { error, message } = JSON.parse(response)

        const constructor = errors[error]

        callback(new constructor(message))
    })

    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    const { sub: userId } = extractPayload(sessionStorage.token)

    xhr.open('GET', `http://${import.meta.env.VITE_API_URL}/users/${userId}/name`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}
