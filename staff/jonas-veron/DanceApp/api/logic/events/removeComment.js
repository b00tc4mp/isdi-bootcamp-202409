import { User, Event } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, eventId, commentId) => {
  validate.id(userId, "userId")
  validate.id(eventId, "eventId")
  validate.id(commentId, "commentId")

  return Promise.all([User.findById(userId).lean(), Event.findById(eventId)])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, event]) => {
      if (!user) throw new NotFoundError("User not found")
      if (!event) throw new NotFoundError("Event not found")

      const comment = event.comments.id(commentId)

      if (!comment) throw new NotFoundError("Comment not found")
      if (!comment.author.equals(userId))
        throw new OwnershipError("User not author of comment")

      comment.deleteOne()

      return event.save().catch((error) => {
        throw new SystemError(error.message)
      })
    })

    .then((_) => {})
}
