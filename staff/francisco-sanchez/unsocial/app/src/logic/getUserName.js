import { errors } from 'com'
import { extractPayloadFromJWT } from '../utils'

const { SystemError } = errors

export default () => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/name`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
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

/*export default () => {
    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.id === sessionStorage.userId)

    if (!user) throw new Error('user not found')

    return user.name
}*/

