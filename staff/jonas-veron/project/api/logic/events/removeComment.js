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
      if (!user) throw new NotFoundError("user not found")
      if (!event) throw new NotFoundError("event not found")

      const comment = event.comments.id(commentId)

      if (!comment) throw new NotFoundError("comment not found")
      if (!comment.author.equals(userId))
        throw new OwnershipError("user not author of comment")

      comment.deleteOne()

      return event.save().catch((error) => {
        throw new SystemError(error.message)
      })
    })

    .then((_) => {})
}
