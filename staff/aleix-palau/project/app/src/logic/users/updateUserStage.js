import { validate, errors } from 'com'

const { SystemError } = errors

export default stage => {
    validate.stage(stage)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/stage`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ stage })
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