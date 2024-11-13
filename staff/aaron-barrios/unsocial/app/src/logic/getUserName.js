import { validate } from './helpers/index.js'

import { errors } from '../../../com'

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

    //LO QUE TU LE ENVÍAS (CLIENTE)
    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}/name`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}
