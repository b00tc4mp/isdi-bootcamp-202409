import { User, Event } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError, PermissionError } = errors

export default (userId, images, type, text, date, location) => {
  validate.id(userId, "userId")
  validate.images(images)
  validate.text(text)
  validate.date(date)
  validate.location(location)

  const parsedDate = new Date(date)

  return User.findById(userId)
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found")
      if (user.permission !== "write")
        throw new PermissionError("user has not permission to create event")

      return Event.create({
        author: userId,
        images,
        type,
        text,
        date: parsedDate,
        location: {
          type: "Point",
          coordinates: location.coordinates,
          address: location.address,
          province: location.province,
        },
      })
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then((_) => {})
    })
}
