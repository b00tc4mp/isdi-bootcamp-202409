import db from 'dat'

import { validate } from 'com'

export default (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return db.users.insertOne({ name, email, username, password })
        .then(_ => { })
        .catch(error => {
            if (error.code === 11000) throw new Error('user already exists')

            throw new Error(error.message)
        })
}