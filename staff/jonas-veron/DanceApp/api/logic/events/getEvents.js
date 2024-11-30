import { Event, User } from "dat"
import { validate, errors } from "com"

const { SystemError, ValidationError } = errors

export default async (userId) => {
  validate.id(userId, "userId")

  try {
    const [user, events] = await Promise.all([
      User.findById(userId).lean(),
      Event.find().populate("author", "name").sort({ date: -1 }).lean(),
    ])
    if (!user) throw new ValidationError("User not found")

    return events.map((event) => ({
      id: event._id.toString(),
      image: event.image,
      text: event.text,
      date: event.date,
      location: {
        address: event.location.address,
        coordinates: event.location.coordinates,
      },
      author: {
        id: event.author._id.toString(),
        name: event.author.name,
      },
      likes: event.likes.length,
      comments: event.comments.length,
      isFavorite: user.favorites.some(
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
