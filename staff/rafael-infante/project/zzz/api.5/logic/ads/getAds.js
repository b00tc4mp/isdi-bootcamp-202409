import { User, Ad } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId) => {
  validate.id(userId, 'userId')

  try {
    const [user, ads] = await Promise.all([
      User.findById(userId).lean(),
      Ad.find().populate('author', 'name role').sort({ date: -1 }).lean(),
    ])
    if (!user) throw new NotFoundError('user not found')

    return ads.map((ad) => ({
      id: ad._id.toString(),
      author: {
        id: ad.author._id.toString(),
        name: ad.author.name,
        role: ad.author.role,
      },
      files: ad.files,
      text: ad.text,
      date: ad.date,
      reviews: ad.reviews.length,
      isFavorite: user.favorites.some((favoriteId) => favoriteId.toString() === ad._id.toString()),
    }))
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    } else {
      throw new SystemError(error.message)
    }
  }
}
