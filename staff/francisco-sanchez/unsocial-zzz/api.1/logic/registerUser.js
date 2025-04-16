//import { storage, uuid } from '../data/index.js'

import db from 'dat'

import { validate, errors } from 'com'

const { DuplicityError, SystemError } = errors

export default (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return db.users.insertOne({ name, email, username, password })
        .then(_ => { })
        .catch(error => {
            if (error.code = 11000) throw new DuplicityError('User already exist')

            throw new SystemError(error.message)
        })


    /*//const users = storage.users
    const { users } = storage

    let user = users.find(user => user.username === username || user.email === email)

    if (user !== undefined)
        throw new Error('user already exists')

    user = { id: uuid(), name: name, email: email, username: username, password: password }

    users.push(user)

    storage.users = users*/
}