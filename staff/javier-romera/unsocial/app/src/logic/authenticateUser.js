import { validate } from './helpers'

export default (username, password, callback) => {
    validate.username(username)
    validate.password(password)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            const userId = JSON.parse(response)

            sessionStorage.loggedInUserId = userId

            callback(null)

            return
        }
        const { error, message } = response

        callback(new Error(message))
    })

    xhr.open('POST', 'http://localhost:8080/authenticate')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ username, password }))
}