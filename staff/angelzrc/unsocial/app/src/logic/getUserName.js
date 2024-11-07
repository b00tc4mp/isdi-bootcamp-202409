<<<<<<< HEAD
import { validate } from 'com'
=======
export default callback => {

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

    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}/name`)

    /* const users = JSON.parse(localStorage.users)
>>>>>>> 1b468274c84eb6f3853c660b2b2683f639a5aa7b

export default callback => {
    validate.callback(callback)

    const xhr = new XMLHttpRequest

<<<<<<< HEAD
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

    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}/name`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
    xhr.send()
}
=======
    return user.name */
}
>>>>>>> 1b468274c84eb6f3853c660b2b2683f639a5aa7b
