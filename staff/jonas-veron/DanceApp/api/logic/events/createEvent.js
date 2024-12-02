import { User, Event } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

export default (userId, image, text, date, location) => {
  validate.id(userId, "userId")
  validate.image(image)
  console.log(image)
  validate.text(text)
  validate.date(date)
  validate.location(location)

  const parsedDate = new Date(date)
  console.log("parsedDate:", parsedDate)
  debugger
  return User.findById(userId)
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError("User not found")
      debugger
      return Event.create({
        author: userId,
        image,
        text,
        date: parsedDate,
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
