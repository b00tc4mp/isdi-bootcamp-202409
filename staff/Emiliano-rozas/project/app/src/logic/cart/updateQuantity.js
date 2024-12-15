import { validate, errors } from 'com';

const { SystemError } = errors

export default (cartItemId, newQuantity) => {
    validate.id(cartItemId, 'cartItemId')
    validate.number(newQuantity)

    return fetch(`http://${import.meta.env.VITE_API_URL}/cart/update/${cartItemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            cartItemId,
            newQuantity
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