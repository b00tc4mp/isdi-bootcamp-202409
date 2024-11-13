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

    xhr.open('GET', 'http://localhost:8080/posts')
    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}

