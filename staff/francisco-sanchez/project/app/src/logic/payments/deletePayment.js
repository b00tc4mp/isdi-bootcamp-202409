import { validate, errors } from "com";

const { SystemError } = errors

export default paymentId => {
    validate.id(paymentId, 'paymentId')

    return fetch(`${import.meta.env.VITE_API_URL}/payments/delete/${paymentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.token}` }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return
            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => {
                    throw new errors[error](message)
                })
        })
} 