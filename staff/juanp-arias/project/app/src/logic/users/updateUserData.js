import { validate, errors } from 'com'
import { extractPayLoad } from '../../util/index.js'
const { SystemError } = errors

export default (name, email, dateOfBirth, role) => {
    validate.name(name)
    validate.email(email)
    validate.date(new Date(dateOfBirth))
    validate.text(role)

    const { sub: userId } = extractPayLoad(sessionStorage.token)
    return fetch(`http://${import.meta.env.VITE_API_URL}/users/${userId}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, dateOfBirth, role })
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