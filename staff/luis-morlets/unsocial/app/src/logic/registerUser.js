import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, email, username, password, passwordRepeat, callback) => {

    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)
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

    xhr.addEventListener('error', () => callback(new SystemError('Ups something happened, try again later')))

    xhr.open('POST', 'http://localhost:8080/users')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ name, email, username, password, 'password-repeat': passwordRepeat }))
}