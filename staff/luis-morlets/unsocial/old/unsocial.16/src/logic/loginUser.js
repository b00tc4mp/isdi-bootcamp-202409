import { validate } from './helpers'

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.username === username && user.password === password)

    if (user === undefined)
        throw new Error('Wrong credentials, try again')

    sessionStorage.userId = user.id
}