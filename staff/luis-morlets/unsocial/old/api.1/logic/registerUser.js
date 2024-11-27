import validate from './helpers/validate.js'
import { uuid, users } from '../data/index.js'

export default (name, email, username, password, passwordRepeat) => {

    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)

    let user = users.find(user => user.username === username || user.email === email)

    if (user !== undefined)
        throw new Error('user already exists')

    user = { id: uuid(), name: name, email: email, username: username, password: password, passwordRepeat: passwordRepeat }

    users.push(user)
}