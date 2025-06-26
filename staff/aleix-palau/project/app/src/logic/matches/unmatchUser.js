import { errors, validate } from 'com'

const { SystemError } = errors

export default matchId => {
    validate.id(matchId, 'matchId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/matches/${matchId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
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