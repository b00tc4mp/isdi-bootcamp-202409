import validate from '../../../../com/validate.js' //import { validate, errors } from 'com'
import errors from '../../../../com/errors.js'

const { SystemError } = errors

const loginUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return fetch(`http://localhost:8080/users/auth`, {//http://${import.meta.env.VITE_API_URL}/users/auth
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => {
                        throw new SystemError(error.message)
                    })
                    .then(token => { localStorage.token = token })

            return res.json()
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(({ error, message }) => {
                    throw new errors[error](message)
                })

        })
}

export default loginUser