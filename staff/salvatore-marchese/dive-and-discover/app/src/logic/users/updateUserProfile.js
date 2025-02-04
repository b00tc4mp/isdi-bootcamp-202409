import { errors, validate } from 'com'
import { extractPayloadFromJWT } from '../../util'
const { SystemError } = errors

export default (data) => {
/*     validate.profileData(data, 'data')
 */    // check if a token exists
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    const url = `http://${import.meta.env.VITE_API_URL}/users/diver/profile/${userId}`

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify(data)
    }

    return fetch( url, requestOptions)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok)
            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}