import { validate, errors } from 'com'
import { extractPayloadFromJWT } from '../util'

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
    console.log(localStorage.token)
    const { sub: userId } = extractPayloadFromJWT(localStorage.token)
    console.log(userId)
    xhr.open('GET', `http://${import.meta.env.VITE_API_URL}/users/${userId}/name`)
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.token}`)
    xhr.send()
}
