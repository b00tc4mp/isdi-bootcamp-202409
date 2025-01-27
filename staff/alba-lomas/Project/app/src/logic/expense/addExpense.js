


import { errors, validate } from 'com'
const { SystemError } = errors

export default (amount, type, provider) => {
    validate.number(amount, 'amount')
    validate.text(type, 'type')
    validate.text(provider, 'provider')

    const currentDate = new Date().toISOString() // Fecha actual en formato ISO

    return fetch(`http://${import.meta.env.VITE_API_URL}/expenses`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, type, provider, date: currentDate }) // Agregar 'date'
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