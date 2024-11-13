import { models } from 'dat'
import { validate, errors } from 'com'
import db from 'dat'

const { User } = models
const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
  validate.id(userId, 'userId')
  validate.id(targetUserId, 'targetUserId')

  return User.findOne({ _id: new ObjectId(userId) })
    .catch(error => { new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

      return User.findOne({ _id: new ObjectId(targetUserId) })
        .catch(error => { new SystemError(error.message) })
    })
    .then(user => {
      if (!user) throw new NotFoundError('target user not found')

      return user.name
    })
}