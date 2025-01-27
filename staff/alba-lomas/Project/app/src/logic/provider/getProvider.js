


import { errors, validate } from 'com'
const { SystemError } = errors

export default providerId => {
    validate.id(providerId, 'providerId')

    return fetch(`import.meta.env.VITE_API_URL}/providers/${providerId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
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