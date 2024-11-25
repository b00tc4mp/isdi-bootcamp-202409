import { validate, errors } from 'com'

const { SystemError } = errors
export default (name, email, username, password, repeatpassword) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, repeatpassword)

    return fetch(`http://${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, username, password, repeatpassword })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return
            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}
