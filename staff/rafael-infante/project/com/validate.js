import errors from "./errors.js";

const {ValidationError} = errors

const validateName = name => {
  if (typeof name !== 'string') throw new ValidationError
  if (name.length < 2)
    throw new ValidationError('Invalid name')
}

const validateEmail = email => {
  if (typeof email !== 'string') throw new ValidationError
  if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
    throw new ValidationError('Invalid email')
}

const validateUsername = username => {
  if (typeof username !== 'string') throw new ValidationError
  if (username.length < 4 || username.length > 12)
    throw new ValidationError('invalid user name')
}

const validatePassword = password => {
  if (typeof password !== 'string') throw new ValidationError
  if (password.length < 8)
    throw new ValidationError('invalid password')
}

const validatePasswordsMatch = (password, confirmPassword) => {
  if (typeof confirmPassword !== 'string') throw new ValidationError
  if (password !== confirmPassword)
    throw new ValidationError('passwords do not match')
}

const validateImage = image => {
  if (typeof image !== 'string') throw new ValidationError('invalid image')
}

const validateText = text => {
  if (typeof text !== 'string') throw new ValidationError('invalid text')
}

const validateId = (id, explain = 'id') => {
  if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
  if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
  if (typeof callback !== 'function') throw new ValidationError('callback is not a function')
}

const validate = {
  name: validateName,
  email: validateEmail,
  username: validateUsername,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  image: validateImage,
  text: validateText,
  id: validateId,
  callback: validateCallback,
}

export default validate