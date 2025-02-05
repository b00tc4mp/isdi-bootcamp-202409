import { validate, errors } from 'com'

const { SystemError } = errors

export default (packId, description, remainingQuantity, expiryDate, status) => {
    validate.id(packId, 'packId')
    validate.description(description)
    validate.quantity(remainingQuantity)
    validate.status(status)

    return fetch(`${import.meta.env.VITE_API_URL}/packs/updatepack/${packId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, remainingQuantity, expiryDate, status })
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