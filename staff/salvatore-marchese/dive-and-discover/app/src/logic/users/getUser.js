import { errors } from "com";
import { extractPayloadFromJWT } from "../../util";

const { SystemError } = errors


export default () => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    const url = `http://${import.meta.env.VITE_API_URL}/users/diver/profile/${userId}`

    const headers = {
        Authorization: `Bearer ${sessionStorage.token}`
    }

    // FETCH WITH ERROR HANDLER 
    return fetch(url, { headers })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new SystemError[error](message) })
        })
}