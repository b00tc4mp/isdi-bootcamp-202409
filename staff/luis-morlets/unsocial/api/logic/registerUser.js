import db from 'dat'

import { validate, errors } from 'com'




const { SystemError, DuplicityError } = errors

export default (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)

    return db.users.insertOne({ name, email, username, password })
        .then(_ => { })
        .catch(error => {
            if (error.code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        })
}