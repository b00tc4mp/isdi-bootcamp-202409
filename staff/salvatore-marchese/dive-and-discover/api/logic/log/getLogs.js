import { User, LogBook } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

export default async (userId) => {
    const user = await User.findById(userId)
    if (!user) throw new NotFoundError('User not found')
  
    const logs = await LogBook.find({ diver: userId })
    return logs
  }