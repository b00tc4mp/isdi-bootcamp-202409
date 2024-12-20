import bcrypt from "bcryptjs"

import { User } from "dat"
import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors

export default (name, email, role, password, passwordRepeat) => {
  validate.name(name)
  validate.email(email)
  validate.role(role)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  return bcrypt
    .hash(password, 10)
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((hash) =>
      User.create({ name, email, role, password: hash })
        .then((_) => {})
        .catch((error) => {
          if (error.code === 11000)
            throw new DuplicityError("user already exists")

          throw new SystemError(error.message)
        })
    )
}
