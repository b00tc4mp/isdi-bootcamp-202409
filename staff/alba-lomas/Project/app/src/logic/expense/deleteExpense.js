


import { validate } from 'com'

export default expenseId => {
    validate.id(expenseId, 'expenseId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`  // Incluir el token de autorización
        },
    })
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(res => {
            if (res.ok) {
                return
            }
            return res.json()
                .then(({ error, message }) => {
                    throw new errors[error](message)
                })
        })
}