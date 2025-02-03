import { validate } from 'com'

export default callback => {
    //TODO: ¿Esto por qué? 
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            const posts = JSON.parse(response)
            callback(null, posts)
            return
        }

        const { error, message } = JSON.parse(response)
        const constructor = errors[error]

        callback(new constructor(message))
    })

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`)
    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    //xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}

