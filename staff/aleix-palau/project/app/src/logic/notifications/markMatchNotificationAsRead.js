import { errors } from 'com'
import { validate } from 'com'

const { SystemError } = errors

export default notificationId => {
    validate.id(notificationId, 'notificationId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/notifications/match/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok) {
                return // Return nothing on success
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}