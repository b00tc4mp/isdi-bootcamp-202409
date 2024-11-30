import { User, Event } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, eventId) => {
  validate.id(userId, "userId")
  validate.id(eventId, "eventId")

  return Promise.all([User.findById(userId), Event.findById(eventId)])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, event]) => {
      if (!user) throw new NotFoundError("User not found")
      if (!event) throw new NotFoundError("Event not found")
      if (!event.author.equals(userId))
        throw new OwnershipError("User is not author of event")

      return Event.deleteOne({ _id: eventId }).catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((_) => {
      return { message: "Event deleted" }
    })
}
