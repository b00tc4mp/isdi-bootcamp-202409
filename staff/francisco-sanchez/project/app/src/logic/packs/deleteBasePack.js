import { validate, errors } from "com";

const { SystemError } = errors

export default basePackId => {
    validate.id(basePackId, 'basePackId')

    return fetch(`${import.meta.env.VITE_API_URL}/packs/delete/${basePackId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.token}` }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return
            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => {
                    throw new errors[error](message)
                })
        })
} 