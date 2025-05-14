import { errors } from 'com'
import { validate } from 'com'

const { SystemError } = errors

export default matchId => {
    validate.id(matchId, 'matchId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/notifications/${matchId}/read`, {
        method: 'PATCH', // Use PATCH as we are updating status
        headers: {
            Authorization: `Bearer ${localStorage.token}`
            // No Content-Type or body needed for this specific PATCH
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok) {
                // Successful update (status 204 No Content expected)
                return // Return nothing on success
            }

            // Handle potential errors (e.g., 401 Unauthorized, 404 Not Found, 500 Server Error)
            return res.json() // Attempt to parse error details if available
                .catch(error => { throw new SystemError(error.message) }) // Fallback if JSON parsing fails
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}