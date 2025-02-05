import { validate, errors } from 'com'

const { SystemError } = errors

export default (packId, amount, currency, method, paymentStatus) => {
    validate.id(packId)
    validate.payedAmount(amount)
    validate.currency(currency)
    validate.method(method)

    return fetch(`${import.meta.env.VITE_API_URL}/payments/add-payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ packId, amount, currency, method, paymentStatus })
    })
        .catch(error => {
            throw new SystemError(error.message)
        })
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