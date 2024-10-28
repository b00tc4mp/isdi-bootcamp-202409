import { validate } from './helpers'

import uuid from '../data/uuid'

export default (name, email, username, password, confirmpassword) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(passwordsMatch)

    const users = JSON.parse(localStorage.users)

    let user = users.find(user => user.username === username || user.email === email)

    if (user !== undefined) throw new Error('user already exists')

    user = { id: uuid(), name: name, email: email, username: username, password: password }

    users.push(user)

    localStorage.users = JSON.stringify(users)
}