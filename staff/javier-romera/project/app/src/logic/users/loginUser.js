import { validate, errors } from 'com'

const { SystemError } = errors

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    const headers = {
        'Content-Type': 'application/json'
    }

    if (localStorage.token)
        headers.Authorization = `Bearer ${localStorage.token}`

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers,
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
}