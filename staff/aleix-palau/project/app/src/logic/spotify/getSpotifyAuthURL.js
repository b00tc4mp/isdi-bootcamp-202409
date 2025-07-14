import { errors } from 'com'
import logic from '../../logic/index.js'

const { SystemError } = errors

export default () => {
    return fetch(`http://${import.meta.env.VITE_API_URL}/spotify/auth-url`, {
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
        .then(({ authUrl }) => {
            // Add userId as state parameter
            const userId = logic.getUserId()
            const url = new URL(authUrl)
            url.searchParams.append('state', userId)
            return url.toString()
        })
}