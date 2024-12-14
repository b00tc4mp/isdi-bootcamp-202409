import { users } from '../data/index.js'

export default userId => {
  if (typeof userId !== 'string') throw new Error('invalid userId')

  const user = users.find(user => user.id === userId)

  if (!user) throw new Error('user not found')

  return user.name
}

