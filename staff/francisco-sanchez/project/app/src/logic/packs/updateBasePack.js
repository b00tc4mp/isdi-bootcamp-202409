import { validate, errors } from 'com'

const { SystemError } = errors

export default (basePackId, packName, description, quantity, unit, expiringTime, price, currency) => {
    validate.id(basePackId, 'basePackId')
    validate.name(packName)
    validate.description(description)
    validate.quantity(quantity)
    validate.units(unit)
    validate.expiring(expiringTime)
    validate.currency(currency)


    return fetch(`${import.meta.env.VITE_API_URL}/packs/update/${basePackId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ packName, description, quantity, unit, expiringTime, price, currency })
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