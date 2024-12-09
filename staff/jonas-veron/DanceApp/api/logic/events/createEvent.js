import { User, Event } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

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
        },
      })
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then((event) => {
          return {
            id: event._id.toString(),
            //retorno el ID del evento para operar con cada evento.
          }
        })
    })
}
