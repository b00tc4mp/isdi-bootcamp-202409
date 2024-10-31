import {storage } from '../data/index.js'
import validate from './helpers/validate.js'

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    const {users} = storage
    const user = users.find(user => users.username === username && users.password === password)

    if (user === undefined)
        throw new Error('wrong credentials')

    return user.id
}