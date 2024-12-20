import { validate, errors } from 'com'

const { SystemError } = errors

export default (cyclePhase) => {
    validate.phase(cyclePhase)

    return fetch(`http://${import.meta.env.VITE_API_URL}/tips/${cyclePhase}/tips`, {
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