import { Ad, User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId) => {
  validate.id(userId, 'userId')

  try {
    const user = await User.findById(userId)

    if (!user) throw new NotFoundError('user not found')

    const favoriteAds = await Ad.find({
      _id: { $in: user.favorites },
    })
      .populate('author', 'name role')
      .sort({ date: -1 })
      .lean()

    if (!favoriteAds) throw new NotFoundError('ad not found')

    return favoriteAds.map((ad) => ({
      id: ad._id.toString(),
      author: {
        id: ad.author._id.toString(),
        name: ad.author.name,
        role: ad.author.role,
      },
      files: ad.files,
      text: ad.text,
      date: ad.date,
      location: {
        address: ad.location.address,
        coordinates: ad.location.coordinates,
      },
      reviews: ad.reviews.length,
      isFavorite: true,
    }))
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    } else {
      throw new SystemError(error.message)
    }
  }
}
