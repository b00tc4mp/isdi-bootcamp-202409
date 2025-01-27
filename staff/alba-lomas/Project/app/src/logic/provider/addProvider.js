


import { errors, validate } from 'com'
const { SystemError } = errors

export default (type, provider) => {
    validate.text(type, 'type')
    validate.text(provider, 'provider')

    return fetch(`import.meta.env.VITE_API_URL}/providers`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, provider })
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