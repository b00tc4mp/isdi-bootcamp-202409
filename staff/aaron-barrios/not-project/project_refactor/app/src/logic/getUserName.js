import { errors } from 'com'
import { extractPayload } from '../util'

const { SystemError } = errors

export default () => {
    const { sub: userId } = extractPayload(localStorage.token)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/${userId}/name`, {
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
