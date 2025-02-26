import { storage, uuid } from '../data/index.js'

import validate from './helpers/validate.js'

export default (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    const { users } = storage

    let user = users.find( user => user.username === username || user.email === email)

    if (user)
        throw new Error('user already exists')

    user = { id: uuid(), name: name, email: email, username: username, password: password }

    users.push(user)

    storage.users = users
}