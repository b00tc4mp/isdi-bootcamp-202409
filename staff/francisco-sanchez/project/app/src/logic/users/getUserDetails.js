import { errors } from 'com'
import { extractPayloadJWt } from '../../util'

const { SystemError } = errors
export default () => {
    const { sub: userId } = extractPayloadJWt(localStorage.token)
    return fetch(`${import.meta.env.VITE_API_URL}/users/user/${userId}`, {
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