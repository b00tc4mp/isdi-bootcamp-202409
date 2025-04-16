import { validate } from '../../../com'


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

        callback(new Error(message))
    })

    xhr.open('POST', 'http://localhost:8080/authenticate')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ username, password }))
}