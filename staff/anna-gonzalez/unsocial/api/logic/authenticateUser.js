import { validate } from 'com'

import { storage } from '../data/index.js'

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    const { users } = storage

    const user = users.find(user => user.username === username && user.password === password)

    if (user === undefined)
        throw new Error('Wrong credentials')

    return user.id
}