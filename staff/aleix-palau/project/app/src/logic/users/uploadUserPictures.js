import { validate, errors } from 'com'
import { extractPayloadFromJWT } from '../../util'

const { SystemError } = errors

export default pictures => {
    validate.pictures(pictures)

    const { sub: userId } = extractPayloadFromJWT(localStorage.token) // Extract user ID from the JWT stored in localStorage

    // Send the POST request to upload the pictures
    return fetch(`http://${import.meta.env.VITE_API_URL}/users/${userId}/pictures`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({ pictures })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch((error) => { throw new SystemError(error.message) })

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}