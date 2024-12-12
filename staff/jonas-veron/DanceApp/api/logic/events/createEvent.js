import { User, Event } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError, PermissionError } = errors

export default (userId, files, eventType, text, eventDate, location) => {
  validate.id(userId, "userId")
  validate.files(files)
  validate.text(text)
  validate.date(eventDate)
  validate.location(location)

  const parsedEventDate = new Date(eventDate)

  return User.findById(userId)
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError("User not found")
      // if (user.role !== "organizer")
      //despues cambiar a permission !== 'write'
      // throw new PermissionError("User has not permission to create event")

      return Event.create({
        author: userId,
        files,
        eventType,
        text,
        eventDate: parsedEventDate,
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
        .then(() => {})
    })
}
