import { validate, errors } from 'com'

const { SystemError } = errors
export default (name, email, username, password, repeatpassword, callback) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, repeatpassword)

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

    xhr.open('POST', 'http://localhost:7070/register')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ name, email, username, password, 'password-repeat': repeatpassword }))
}
