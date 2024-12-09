import { validate, errors } from 'com'
import { extractPayloadFromJWT } from '../../util'

const { SystemError } = errors

export default (data) => {
    const { name, dateOfBirth } = data

    validate.name(name)
    validate.dateOfBirth(dateOfBirth)

    // Extract user ID from the JWT stored in localStorage
    const { sub: userId } = extractPayloadFromJWT(localStorage.token)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(data)
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}