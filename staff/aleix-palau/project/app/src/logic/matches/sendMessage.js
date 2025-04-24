import { errors, validate } from 'com'

const { SystemError } = errors

export default (matchId, text) => {
    validate.id(matchId, 'matchId')
    validate.text(text, 'message text', 500)

    return fetch(`http://${import.meta.env.VITE_API_URL}/matches/${matchId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ text })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}