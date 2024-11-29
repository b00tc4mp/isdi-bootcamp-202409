import bcrypt from "bcryptjs"

import { User } from "dat"
import { validate, errors } from "../../com/index.js"

const { DuplicityError, SystemError } = errors

export default (fullName, email, password, passwordRepeat) => {
  validate.fullName(fullName)
  validate.email(email)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  return bcrypt
    .hash(password, 10)
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((hash) =>
      User.create({ fullName, email, password: hash })
        .then((_) => {})
        .catch((error) => {
          if (error.code === 11000)
            throw new DuplicityError("user already exists")

          throw new SystemError(error.message)
        })
    )
}
