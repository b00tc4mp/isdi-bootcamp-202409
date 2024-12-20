import { User, Ad } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, adId, reviewId) => {
  validate.id(userId, 'userId')
  validate.id(adId, 'adId')
  validate.id(reviewId, 'reviewId')

  return Promise.all([User.findById(userId).lean(), Ad.findById(adId)])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, ad]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!ad) throw new NotFoundError('ad not found')

      const review = ad.reviews.id(reviewId)

      if (!review) throw new NotFoundError('review not found')
      if (!review.author.equals(userId)) throw new OwnershipError('user is not author of review')

      review.deleteOne({ _id: reviewId })

      return ad.save().catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((_) => {})
}
