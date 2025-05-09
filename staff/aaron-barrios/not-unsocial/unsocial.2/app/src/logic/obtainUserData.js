import { validate } from './helpers'

import getUserId from './getUserId'

export default (name, username, email, password) => {
    // validate.name(name)
    // // validate.email(email)
    // validate.username(username)
    // validate.password(password)

    const users = JSON.parse(localStorage.users)

    const userId = getUserId()

    let user = users.find(({ id }) => id === userId)

    name === undefined ? user.name = user.name : user.name = name
    username === undefined ? user.username = user.username : user.username = username
    email === undefined ? user.email = user.email : user.email = email
    password === undefined ? user.password = user.password : user.password = password


    localStorage.users = JSON.stringify(users)
}
