import { validate } from './helpers/index.js'

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

        callback(new Error(message))
    })

    //LO QUE TU LE ENVÍAS (CLIENTE)
    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}/name`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}
