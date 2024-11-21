import { errors, validate } from 'com'

const { SystemError } = errors

export default (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    //RESPUESTA LO QUE RECIBE EL SERVIDOR
    xhr.addEventListener('load', () => {
        const { status, response } = xhr


        if (status === 200) {
            const token = JSON.parse(response)

            sessionStorage.token = token

            callback(null)

            return
        }

        const { error, message } = JSON.parse(response)

        const constructor = errors[error]

        callback(new constructor(message))
    })

    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    //LO QUE TU LE ENVÍAS (CLIENTE)
    xhr.open('POST', `http://${import.meta.env.VITE_API_URL}/users/auth`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ username, password }))
}

