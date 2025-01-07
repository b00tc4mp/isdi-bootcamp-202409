import { errors, validate } from 'com'

const { SystemError } = errors

export default (whatHappened) => {
    if (whatHappened) {
        validate.whatHappened(whatHappened)
    }
    return fetch(`http://${import.meta.env.VITE_API_URL}/posts?whatHappened=${whatHappened}`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
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