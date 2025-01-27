


import { errors } from 'com'
const { SystemError } = errors

export default () => {
    return fetch(`http://${import.meta.env.VITE_API_URL}/expenses/expenseId`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return res.json().then(({ error, message }) => {
                throw new errors[error](message)
            });
        })
}        