import { validate, errors } from 'com';

const { SystemError } = errors

export default cartItemId => {
    validate.id(cartItemId, 'cartItemId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/cart/remove/${cartItemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },

    })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .then(({ error, message }) => { throw new errors[error](message); });
            }
            return res.json();
        })
        .catch(error => { throw new SystemError(error.message); });
};