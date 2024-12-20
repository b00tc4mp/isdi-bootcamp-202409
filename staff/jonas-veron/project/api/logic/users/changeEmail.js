import { User } from "dat"
import { validate, errors } from "com"

const { CredentialsError, NotFoundError, SystemError } = errors

export default (userId, oldEmail, newEmail, newEmailRepeat) => {
  validate.id(userId, "userId")
  validate.email(newEmail)
  validate.emailsMatch(newEmail, newEmailRepeat)

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found")
      if (user.email !== oldEmail) {
        throw new CredentialsError("wrong credentials")
      }

      return User.findByIdAndUpdate(userId, { email: newEmail })
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then(() => {})
    })
}
