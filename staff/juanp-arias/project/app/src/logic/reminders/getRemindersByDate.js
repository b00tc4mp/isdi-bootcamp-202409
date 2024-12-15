import { errors } from 'com'

const { SystemError } = errors
export default date => {
    if (!date) throw new SystemError('Date is required to fetch reminders.')
    return fetch(`http://${import.meta.env.VITE_API_URL}/reminders/${date}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(res => {
            if (res.ok) {
                return res.json().catch(error => {
                    throw new SystemError(error.message)
                })
            }
            return res.json()
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(({ error, message }) => {
                    throw new errors[error](message)
                })
        })
}