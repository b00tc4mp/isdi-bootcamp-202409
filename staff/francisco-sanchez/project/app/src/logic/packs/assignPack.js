import { validate, errors } from 'com'

const { SystemError, NotFoundError, PaymentError } = errors


export default (customerSearch, selectPack, description, payedAmount, paymentMethod) => {
    validate.text(customerSearch)
    validate.id(selectPack)
    validate.description(description)
    validate.payedAmount(payedAmount)
    validate.paymentMethod(paymentMethod)

    return fetch(`${import.meta.env.VITE_API_URL}/packs/assign-pack`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ customerSearch, selectPack, description, payedAmount, paymentMethod })
    })
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => {
                        throw new SystemError(error.message)
                    })
                    .then(({ error, message }) => {
                        throw new errors[error](message)
                    })
            }
        })
}