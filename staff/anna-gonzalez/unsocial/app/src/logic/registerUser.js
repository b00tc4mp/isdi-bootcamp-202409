import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, email, username, password, passwordRepeat, callback) => { //añadimos callback para avisar q ha ido bien, ya q no puede ser un return
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => { //esto es asincronía
        const { status, response } = xhr

        if (status === 201) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(response)

        const constructor = errors[error]

        callback(new constructor(message))
    })

    xhr.addEventListener('error', () => callback(new SystemError('Server error')))

    xhr.open('POST', 'http://localhost:8080/users') //esto es indispensable
    xhr.setRequestHeader('Content-Type', 'application/json') //solo si hay body. También podría ser authorization si hay un user loggeado
    xhr.send(JSON.stringify({ name, email, username, password, 'password-repeat': passwordRepeat })) //vacío si no enviamos data
}