import db from "../../../dat/index.js";
import { validate, errors } from "com";

const { CredentialsError, SystemError } = errors

export default (username, password) => {
  validate.username(username)
  validate.password(password)

  return db.users.findOne({ username, password })
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new CredentialsError('wrong credentials')

      return user._id.toString()
    })
}