import { validate } from 'com'

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

    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}/name`)
    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}




/*export default () => {
    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.id === sessionStorage.userId)

    if (!user) throw new Error('user not found')

    return user.name
}*/

