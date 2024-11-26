import { storage } from '../data/index.js'
import { validate } from 'com'

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    const { users } = storage

    const found = users.some(({ id }) => id === userId)
    if (!found) throw new Error('user not found')

    const user = users.find(({ id }) => id === targetUserId)
    if (!user) throw new Error('target user not found')

    return user.name
}