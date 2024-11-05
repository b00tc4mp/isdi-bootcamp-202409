import { storage } from '../data/index.js'
import { validate } from 'apu'

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    const { users } = storage

    const user = users.find(user => user.username === username && user.password === password)

    if (!user)
        throw new Error('cagaste')

    return user.id
}