import { User, Ad } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, adId) => {
  validate.id(userId, 'userId')
  validate.id(adId, 'adId')

  return Promise.all([User.findById(userId), Ad.findById(adId).lean()])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, ad]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!ad) throw new NotFoundError('ad not found')

      const { favorites } = user

      const index = favorites.findIndex((adObjectId) => adObjectId.equals(adId))

      if (index < 0) favorites.push(adId)
      else favorites.splice(index, 1)

      return user.save().catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((_) => {})
}
