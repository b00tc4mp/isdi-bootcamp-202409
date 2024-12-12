import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors


export default (userId, basePackId) => {
    //Validates here

    return fetch(`${import.meta.env.VITE_API_URL}/packs/assign-pack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerSearch, refPack, provider, customer, description, originalQuantity, remmainingQuantity, unit, price, currency, purchaseDate, expiryDate, status })

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

