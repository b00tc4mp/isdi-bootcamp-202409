import { validate, errors } from 'apu'

const { SystemError } = errors

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            const { status } = res

            if (status === 200) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(token => localStorage.token = token)
                    .then(_ => { })
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(res => {
                    const { error, message } = res

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            const token = JSON.parse(response)

            localStorage.token = token

            callback(null)

            return
        }
        const { error, message } = JSON.parse(response)

        const constructor = errors[error]

        callback(new constructor(message))
    })

    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    xhr.open('POST', `http://${import.meta.env.VITE_API_URL}/users/auth`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ username, password }))
}