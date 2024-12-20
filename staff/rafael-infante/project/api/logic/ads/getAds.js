import { User, Ad } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId) => {
  validate.id(userId, 'userId')

  try {
    const [user, ads] = await Promise.all([
      User.findById(userId).lean(),
      Ad.find().populate('author', 'name role telephone').sort({ date: -1 }).lean(),
    ])
    if (!user) throw new NotFoundError('user not found')

    return ads.map((ad) => {
      // Calculo del Average Rating
      const totalRatings = ad.reviews.reduce((sum, review) => sum + review.calification, 0)
      const averageRating = ad.reviews.length > 0 ? (totalRatings / ad.reviews.length).toFixed(1) : 'No ratings'

      return {
        id: ad._id.toString(),
        author: {
          id: ad.author._id.toString(),
          name: ad.author.name,
          role: ad.author.role,
          telephone: ad.author.telephone,
        },
        files: ad.files,
        text: ad.text,
        date: ad.date,
        location: {
          address: ad.location?.address || null,
          coordinates: ad.location?.coordinates || null,
        },
        reviews: ad.reviews.length,
        averageRating,
        isFavorite: user.favorites.some((favoriteId) => favoriteId.toString() === ad._id.toString()),
      }
    })
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    } else {
      throw new SystemError(error.message)
    }
  }
}
