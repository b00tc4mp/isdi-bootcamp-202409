import { User, Event, Comment } from "dat"

import { validate, errors } from "com"
const { SystemError, NotFoundError } = errors

export default (userId, eventId, text) => {
  validate.id(userId, "userId")
  validate.id(eventId, "eventId")
  validate.text(text)

  return Promise.all([User.findById(userId).lean(), Event.findById(eventId)])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, event]) => {
      if (!user) throw new NotFoundError("user not found")
      if (!event) throw new NotFoundError("event not found")

      const comment = new Comment({
        author: userId,
        text,
      })

      event.comments.push(comment)

      return event.save().catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((_) => {})
}
