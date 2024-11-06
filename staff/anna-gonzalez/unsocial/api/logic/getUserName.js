import { validate } from 'com'

import { storage } from '../data/index.js'

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    const { users } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('User not found')

    const user = users.find(({ id }) => id === targetUserId)

    if (!user) throw new Error('Target user not found')

    return user.name
}