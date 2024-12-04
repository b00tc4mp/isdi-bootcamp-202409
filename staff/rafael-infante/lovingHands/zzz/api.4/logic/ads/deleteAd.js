import { User, Ad } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, adId) => {
  validate.id(userId, 'userId')
  validate.id(adId, 'adId')

  return Promise.all([User.findById(userId).lean(), Ad.findById(adId)])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, ad]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!ad) throw new NotFoundError('ad not found')
      if (!ad.author.equals(userId)) throw new OwnershipError('user is not author of ad')

      return Ad.findByIdAndDelete(adId).catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((_) => {})
}
