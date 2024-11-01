import { storage } from '../data/index.js'

export default userId => {
    const { users } = storage

    const user = users.find(user => user.id === userId)

    if (!user) throw new Error('user not found')

    return user.username
}