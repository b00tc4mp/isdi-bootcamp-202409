import { validate, errors } from 'apu'

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

    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.loggedInUserId}/name`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.loggedInUserId}`)
    xhr.send()
}