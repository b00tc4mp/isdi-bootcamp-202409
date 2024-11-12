import { validate, errors } from 'com'

const { SystemError } = errors

export default callback => {
    validate.callback

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            const posts = JSON.parse(response)

            callback(null, posts)

            return
        }
        const { error, message } = JSON.parse(response)

        callback(new Error(message))

    })

    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    xhr.open('GET', 'http://localhost:8080/posts')
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}
