import { validate, errors } from 'com'

const { SystemError } = errors

export default (formattedDate, title) => {
    validate.date(formattedDate)
    validate.text(title)

    return fetch(`http://${import.meta.env.VITE_API_URL}/reminders/${formattedDate}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
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