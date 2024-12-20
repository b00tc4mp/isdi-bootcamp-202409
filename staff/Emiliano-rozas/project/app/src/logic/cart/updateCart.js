import { validate, errors } from 'com';

const { SystemError } = errors

export default (productId, quantity) => {
    validate.id(productId, 'productId')
    validate.number(quantity)

    return fetch(`http://${import.meta.env.VITE_API_URL}/carts/updates/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            productId,
            quantity
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