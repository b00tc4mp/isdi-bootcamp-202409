import { User, Event } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

export default (userId, eventId) => {
  validate.id(userId, "userId")
  validate.id(eventId, "eventId")

  return Promise.all([User.findById(userId).lean(), Event.findById(eventId)])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, event]) => {
      if (!user) throw new NotFoundError("user not found")
      if (!event) throw new NotFoundError("event not found")

      const { likes } = event

      const index = likes.findIndex((userObjectId) =>
        userObjectId.equals(userId)
      )

      if (index < 0) likes.push(userId)
      else likes.splice(index, 1)

      return event.save().catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((_) => {})
}
