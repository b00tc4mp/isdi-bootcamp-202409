import db from 'dat'

import { validate } from 'com'

let chain = Promise.resolve()


export default (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    chain = chain.then(() => new Promise((resolve, reject) => {
        db.users.findOne({ $or: [{ email }, { username }] })
            .then(user => {
                if (user) throw new Error('user already exists')

                return db.users.insertOne({ name, email, username, password })
                    .then(_ => resolve())
                    .catch(error => reject(error))
            })
    }))

    return chain
} 