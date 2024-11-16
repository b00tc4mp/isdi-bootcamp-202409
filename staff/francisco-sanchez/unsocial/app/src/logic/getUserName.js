import { validate } from 'com'
import { extractPayloadFromJWT } from '../utils'

export default callback => {
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            const name = JSON.parse(response)
            callback(null, name)
            return
        }

        const { error, message } = JSON.parse(response)
        const constructor = errors[error]
        callback(new constructor(message))
    })

    //xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/${sessionStorage.userId}/name`)
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)
    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/${userId}/name`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

    //xhr.addEventListener('error', () => callback(new SystemError('server error')))
    //xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)

    xhr.send()
}




/*export default () => {
    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.id === sessionStorage.userId)

    if (!user) throw new Error('user not found')

    return user.name
}*/

