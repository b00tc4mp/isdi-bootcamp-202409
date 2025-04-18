import { errors } from 'com'

const { SystemError } = errors

export default () => {
    return fetch(`http://${import.meta.env.VITE_API_URL}/notifications/unread`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204) { // Handle case where there are no unread notifications
                return { count: 0 }
            }
            if (res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}