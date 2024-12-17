import { validate, errors } from 'com'

const { SystemError } = errors

export default (status, from) => {
    validate.status(status)
    validate.from(from)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ status, from })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok) return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}