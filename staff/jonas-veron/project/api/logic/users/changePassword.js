import bcrypt from "bcryptjs"

import { User } from "dat"
import { validate, errors } from "com"

const { CredentialsError, NotFoundError, SystemError } = errors

export default (userId, oldPassword, newPassword, newPasswordRepeat) => {
  validate.id(userId, "userId")
  validate.password(newPassword)
  validate.passwordsMatch(newPassword, newPasswordRepeat)

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found")

      return bcrypt.compare(oldPassword, user.password).then((isMatch) => {
        if (!isMatch) {
          throw new CredentialsError("wrong credentials")
        }

        return bcrypt
          .hash(newPassword, 10)
          .catch((error) => {
            throw new SystemError(error.message)
          })
          .then((hashedPassword) => {
            user.password = hashedPassword

            return User.findByIdAndUpdate(userId, { password: hashedPassword })
              .catch((error) => {
                throw new SystemError(error.message)
              })
              .then(() => {})
          })
      })
    })
}
