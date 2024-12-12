import { validate, errors } from 'com'

const { SystemError } = errors

export default (reminderId, title, text, date) => {
    validate.id(reminderId, 'reminderId')
    validate.text(text)

    return fetch(`http://${import.meta.env.VITE_API_URL}/reminders/reminder/${reminderId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, text, date })
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