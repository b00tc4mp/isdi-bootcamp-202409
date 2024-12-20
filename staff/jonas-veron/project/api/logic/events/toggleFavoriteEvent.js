import { User, Event } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

export default (userId, eventId) => {
  validate.id(userId, "userId")
  validate.id(eventId, "eventId")

  return Promise.all([User.findById(userId), Event.findById(eventId)])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, event]) => {
      if (!user) throw new NotFoundError("user not found")
      if (!event) throw new NotFoundError("event not found")

      const { favorites } = user

      const index = favorites.findIndex((favoriteEventId) =>
        favoriteEventId.equals(eventId)
      )

      if (index < 0) favorites.push(eventId)
      else favorites.splice(index, 1)

      return user.save().catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((_) => {})
}
