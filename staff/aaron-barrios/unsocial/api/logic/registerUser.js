import { storage, uuid } from '../data/index.js'

import validate from './helpers/validate.js'

export default (name, email, username, password, passwordRepeat) => {

    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)


    const { users } = storage

    let user = users.find(user => user.username === username || user.email === email)

    if (user !== undefined) {
        throw new Error('Username already exists')
    }

    user = { id: uuid(), name: name, email: email, username: username, password: password }

    users.push(user)

    storage.users = users
}
