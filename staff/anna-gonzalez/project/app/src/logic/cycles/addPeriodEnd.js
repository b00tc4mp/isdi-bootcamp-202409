import { validate, errors } from 'com'

const { SystemError } = errors

export default (periodEnd) => {
    validate.date(periodEnd)

    return fetch(`http://${import.meta.env.VITE_API_URL}/cycles/periodEnd`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ periodEnd })
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