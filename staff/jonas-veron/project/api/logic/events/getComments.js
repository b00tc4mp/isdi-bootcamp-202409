import { User, Event } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

export default (userId, eventId) => {
  validate.id(userId, "userId")
  validate.id(eventId, "eventId")

  return Promise.all([
    User.exists({ _id: userId }),
    Event.findById(eventId).populate("comments.author", "name").lean(),
  ])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([userExists, event]) => {
      if (!userExists) throw new NotFoundError("user not found")
      if (!event) throw new NotFoundError("event not found")

      const { comments } = event

      comments.forEach((comment) => {
        comment.id = comment._id.toString()
        delete comment._id

        const { author } = comment

        if (author._id) {
          author.id = author._id.toString()
          delete author._id
        }
      })
      return comments
    })
}
