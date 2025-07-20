import errors from './errors.js'

const { ValidationError } = errors

const validateName = name => {
  if (typeof name !== 'string') throw new ValidationError('invalid name')
  if (name.length < 2)
    throw new ValidationError('invalid name length')
}

const validateEmail = email => {
  if (typeof email !== 'string') throw new ValidationError('invalid email')
  if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
    throw new ValidationError('invalid e-mail')
}

const validateUsername = username => {
  if (typeof username !== 'string') throw new ValidationError('invalid username')
  if (username.length < 4 || username.length > 12)
    throw new ValidationError('invalid username length')
}

const validatePassword = password => {
  if (typeof password !== 'string') throw new ValidationError('invalid password')
  if (password.length < 8)
    throw new ValidationError('invalid password length')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
  if (typeof passwordRepeat !== 'string') throw new ValidationError('invalid password repeat')
  if (password !== passwordRepeat)
    throw new ValidationError('passwords do not match')
}

const validateImage = image => {
  if (typeof image !== 'string') throw new ValidationError('invalid image')
}

const validateCategory = category => {
  if (typeof category !== 'string') throw new ValidationError('invalid category')
}

const validateKeyWord = keyWord => {
  if (typeof keyWord !== 'string') throw new ValidationError('invalid keyword')
  if (keyWord.length > 20) throw new ValidationError('keyword too long')
}
const validateText = text => {
  if (typeof text !== 'string') throw new ValidationError('invalid text')
}

const validateId = (id, explain = 'id') => {
  if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
  if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
  if (typeof callback !== 'function') throw new ValidationError('invalid callback')
}

const validate = {
  name: validateName,
  email: validateEmail,
  username: validateUsername,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  image: validateImage,
  category: validateCategory,
  keyword: validateKeyWord,
  text: validateText,
  id: validateId,
  callback: validateCallback
}

export default validate