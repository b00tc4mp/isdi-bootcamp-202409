import { validate, errors } from 'com'

const { SystemError } = errors

export default (nickname, password) => {
    validate.nickname(nickname)
    validate.password(password)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, password })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(token => { localStorage.token = token })

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}