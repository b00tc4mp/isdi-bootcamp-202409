import db from 'dat'

import { validate } from 'apu'

export default (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return db.users.findOne({ $or: [{ email }, { username }] })
        .then(user => {
            if (user) throw new Error('user already exists')

            return db.users.insertOne({ name, email, username, password }).then(_ => { })
        })
}