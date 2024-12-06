import { validate, errors } from 'com'

const { SystemError } = errors

export default (orderId, status) => {
    validate.id(orderId, 'orderId')
    validate.status(status, 'order')

    return fetch(`http://${import.meta.env.VITE_API_URL}/orders/update/${orderId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                status
            })
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