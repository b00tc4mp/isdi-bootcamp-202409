//import validate from "./helpers/validate"

import { validate, errors } from 'com'

export default (username, password) => {

    validate.username(username)
    validate.password(password)
    //validate.callback(callback)

    const { SystemError } = errors

    return fetch(`${import.meta.env.VITE_API_URL}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            const { status } = res

            if (status === 200) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(token => sessionStorage.token = token)
                    .then(_ => { })
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(res => {
                    const { error, message } = res

                    const constructor = errors[error]

                    throw new constructor(message)
                })

        })

    //const xhr = new XMLHttpRequest

    /* xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            //const userId = JSON.parse(response)
            const token = JSON.parse(response)

            //sessionStorage.userId = userId
            sessionStorage.token = token

            callback(null)
            return
        }
        const { error, message } = JSON.parse(response)
        //callback(new Error(error))

        //Con la siguiente modificación pasamos los custom errors a la app
        const constructor = errors[error]
        callback(new constructor(message))
    })



    xhr.open('POST', `${import.meta.env.VITE_API_URL}/authenticate`)

    //Para capturar los errores del sistema tenemos que hacer un eventListener
    xhr.addEventListener('error', () => callback(new SystemError('It`s a server error')))

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ username, password })) */
}
