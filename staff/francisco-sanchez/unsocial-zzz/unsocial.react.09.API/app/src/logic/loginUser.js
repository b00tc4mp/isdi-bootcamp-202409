//import validate from "./helpers/validate"

import { validate } from 'com'

export default (username, password, callback) => {

    validate.username(username)
    validate.password(password)
    validate.callback(callback)


    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {
            const userId = JSON.parse(response)
            sessionStorage.userId = userId
            callback(null)
            return
        }
        const { error, message } = JSON.parse(response)
        callback(new Error(error))
    })

    xhr.open('POST', 'http://localhost:8080/authenticate')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ username, password }))


    // //Recuperamos los usuarios de la memoria
    // const users = JSON.parse(localStorage.users)

    // const user = users.find(user => user.username === username && user.password === password)

    // /*let user = users.find(function (user) {
    //     return user.username === username && user.password === password
    // })*/

    // if (user === undefined)
    //     throw new Error('User or password are not valid')

    // //return user.id
    // sessionStorage.userId = user.id
}

