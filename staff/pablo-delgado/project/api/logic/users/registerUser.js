import bcrypt from 'bcryptjs'
import { User } from '../../models/models.js'
import { validate, errors } from '../../../com/index.js'

const { DuplicityError, SystemError, CredentialsError } = errors

export default (name, email, password, passwordRepeat) => {
  validate.name(name)
  validate.email(email)

  // First, validate that the passwords match
  if (password !== passwordRepeat) throw new CredentialsError('passwords do not match')

  // Then, validate the password length
  if (password.length < 8) throw new CredentialsError('invalid password length')

  return (async () => {
    let hash

    try {
      hash = await bcrypt.hash(password, 10)
    } catch (error) {
      throw new SystemError(error.message)
    }

    try {
      await User.create({ name, email, password: hash })
      return 'User registered successfully'
    } catch (error) {
      if (error.code === 11000) throw new DuplicityError('user already exists')

      throw new SystemError(error.message)
    }
  })()
}