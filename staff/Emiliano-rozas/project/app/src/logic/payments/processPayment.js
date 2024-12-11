import { validate, errors } from 'com'

const { SystemError } = errors

export default (orderId, paymentMethodId, provider) => {
    validate.id(orderId, 'orderId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/payments/intent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            orderId,
            paymentMethodId,
            provider
        })
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

