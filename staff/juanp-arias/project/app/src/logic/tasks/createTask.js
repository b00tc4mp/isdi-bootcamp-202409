import { validate, errors } from 'com'

const { SystemError } = errors
export default (groupId, date, text) => {
    validate.id(groupId, 'groupId')
    validate.date(new Date(date))
    validate.text(text)

    return fetch(`http://${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ groupId, date, text })
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