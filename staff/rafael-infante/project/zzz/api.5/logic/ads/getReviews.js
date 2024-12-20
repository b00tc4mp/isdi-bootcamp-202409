import { User, Ad } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, adId) => {
  validate.id(userId, 'userId')
  validate.id(adId, 'adId')

  return Promise.all([User.exists({ _id: userId }), Ad.findById(adId).populate('reviews.author', 'name').lean()])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([userExists, ad]) => {
      if (!userExists) throw new NotFoundError('user not found')
      if (!ad) throw new NotFoundError('ad not found')

      const { reviews } = ad

      const transformedReviews = reviews.map((review) => {
        const transformedReview = {
          id: review._id.toString(),
          comment: review.comment,
          calification: review.calification,
          author: review.author
            ? {
                id: review.author._id.toString(),
                name: review.author.name,
              }
            : null,
        }

        return transformedReview
      })

      return transformedReviews
    })
}
