import { validate, errors } from 'com'

const { SystemError } = errors

export default reminderId => {
    validate.id(reminderId, 'reminderId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/reminders/${reminderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${sessionStorage.token}` }
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