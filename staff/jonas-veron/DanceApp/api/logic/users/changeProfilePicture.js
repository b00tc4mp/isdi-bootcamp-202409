import { User, Event } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

export default (userId, image) => {
  validate.id(userId, "userId")
  validate.images(image)

  return User.findById(userId)
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError("User not found")

      return User.findByIdAndUpdate(userId, { profilePicture: image })
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then(() => {})
    })
}
