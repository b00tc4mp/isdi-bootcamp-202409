import { Event, User } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

export default async (userId) => {
  validate.id(userId, "userId")

  try {
    const user = await User.findById(userId)

    if (!user) {
      throw new NotFoundError("user not found")
    }

    const favoriteEvents = await Event.find({
      _id: { $in: user.favorites },
    })
      .populate("author", "name profilePicture")
      .sort({ createdAt: -1 })
      .lean()

    return favoriteEvents.map((event) => ({
      id: event._id.toString(),
      images: event.images,
      type: event.type,
      text: event.text,
      date: event.date,
      createdAt: event.createdAt,
      location: {
        address: event.location.address,
        province: event.location.province,
        coordinates: event.location.coordinates,
      },
      author: {
        id: event.author._id.toString(),

        name: event.author.name,
        profilePicture: event.author.profilePicture || null,
      },
      likes: event.likes.length,
      comments: event.comments.length,
      favoriteByUser: user.favorites.some(
        (favoriteId) => favoriteId.toString() === event._id.toString()
      ),
      likedByUser: event.likes.some(
        (likeId) => likeId.toString() === userId.toString()
      ),
    }))
  } catch (error) {
    throw new SystemError(error.message)
  }
}
