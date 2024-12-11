import { validate, errors } from 'com'

const { SystemError } = errors

export default (paymentIntentId) => {
    validate.id(userId, 'userId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/payments/intent/${paymentIntentId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    }).catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}
