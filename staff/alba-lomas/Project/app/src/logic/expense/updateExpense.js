


import { validate, errors } from 'com'
const { SystemError } = errors

export default (expenseId, amount, type, provider) => {
    validate.id(expenseId, 'expenseId')
    validate.number(amount, 'amount')
    validate.text(type, 'type')
    validate.text(provider, 'provider')


    return fetch(`http://${import.meta.env.VITE_API_URL}/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, type, provider })
    })
        .catch(error => {
            throw new SystemError(error.message)
        }) // error de red
        .then(res => {
            if (res.ok) {
                return
            }
            return res.json() // integracion getExpense
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(({ error, message }) => {
                    throw new errors[error](message)
                })
        })
}