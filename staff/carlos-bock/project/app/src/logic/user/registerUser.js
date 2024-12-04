import validate from '../../../../com/validate.js'//import { validate, errors } from 'com'
import errors from '../../../../com/errors.js'

const { SystemError } = errors

const registerUser = (name, email, username, password, password2) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, password2)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, username, password, password2 })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return

            return res.json()
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(({ error, message }) => {
                    throw new errors[error](message)
                })
        })
}

export default registerUser