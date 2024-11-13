import { validate, errors } from 'com'

const { SystemError } = errors

export default (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            const userId = JSON.parse(response)

            sessionStorage.userId = userId

            callback(null)

            return
        }
        const { error, message } = JSON.parse(response)

        const constructor = errors[error]

        callback(new constructor(message))

    })

    xhr.addEventListener('error', () => callback(new SystemError('Ups something happened, try again later')))

    xhr.open('POST', 'http://localhost:8080/users/auth')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ username, password }))
}