import { validate, errors } from 'apu'

const { SystemError } = errors

export default callback => {
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

    xhr.addEventListener('error', () => callback(new SystemError('server error')))

    xhr.open('GET', `http://${import.meta.env.VITE_API_URL}/posts`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}