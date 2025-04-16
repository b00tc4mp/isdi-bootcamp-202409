import { validate } from 'com'

import { errors } from 'com'

const { SystemError } = errors


export default callback => {
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            console.log('recibo un 200 de getUsers')
            const users = JSON.parse(response)
            callback(null, users)
            return
        }

        const { error, message } = JSON.parse(response)
        const constructor = errors[error]

        callback(new constructor(message))
    })

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users`)
    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    //xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}

