import { validate, errors } from 'com'

const { SystemError } = errors

export default (title, text, date) => {
    validate.text(title)
    validate.text(text)
    validate.date(new Date(date))

    return fetch(`http://${import.meta.env.VITE_API_URL}/reminders`, {
        method: 'POST',
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