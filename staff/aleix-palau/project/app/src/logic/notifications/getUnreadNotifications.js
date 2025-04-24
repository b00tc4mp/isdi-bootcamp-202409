import { errors } from 'com'

const { SystemError } = errors

export default () => {
    return fetch(`http://${import.meta.env.VITE_API_URL}/notifications/unread`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) }) // Network errors
        .then(res => {
            // Check if response is OK (status 200-299)
            if (res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}