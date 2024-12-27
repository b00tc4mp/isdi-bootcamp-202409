import { validate, errors } from 'com'

const { SystemError } = errors

export default (email, username, password, passwordRepeat) => {
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    const headers = {
        'Content-Type': 'application/json'
    }

    if (localStorage.token)
        headers.Authorization = `Bearer ${localStorage.token}`

    return fetch(`http://${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, username, password, 'password-repeat': passwordRepeat })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok) return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}