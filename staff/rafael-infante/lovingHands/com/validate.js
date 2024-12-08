import errors from './errors.js'

const { ValidationError } = errors

const validateName = (name) => {
  if (typeof name !== 'string') throw new ValidationError('Invalid name')
  if (name.length < 2) throw new ValidationError('Invalid name')
}

const validateEmail = (email) => {
  if (typeof email !== 'string') throw new ValidationError('Invalid email')
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  )
    throw new ValidationError('Invalid email')
}

const validatePassword = (password) => {
  if (typeof password !== 'string') throw new ValidationError('Invalid password')
  if (password.length < 8) throw new ValidationError('Invalid password')
}

const validatePasswordsMatch = (password, confirmPassword) => {
  if (typeof confirmPassword !== 'string') throw new ValidationError('passwords do not match')
  if (password !== confirmPassword) throw new ValidationError('passwords do not match')
}

const validateTelephone = (telephone) => {
  if (typeof telephone !== 'string') throw new ValidationError('invalid telephone')
  if (!/^\+\d{1,3}\d{9,12}$/.test(telephone)) throw new ValidationError('invalid telephone')
}

const validateRole = (role) => {
  if (typeof role !== 'string') throw new ValidationError('Invalid role')
}

const validateImage = (image) => {
  if (typeof image !== 'string') throw new ValidationError('invalid image')
}

const validateFiles = (files) => {
  if (!(files instanceof Array)) throw new ValidationError('invalid files')
}

const validateText = (text) => {
  if (typeof text !== 'string') throw new ValidationError('invalid text')
}

const validateLocation = (location) => {
  if (typeof location.address !== 'string') throw new ValidationError('Invalid location format')
  if (location.address.trim().length < 5) throw new ValidationError('Location must be at least 5 characters')
  if (location.address.trim().length > 100) throw new ValidationError('Location must not exceed 100 characters')
  const { coordinates } = location
  if (
    !Array.isArray(coordinates) ||
    coordinates.length !== 2 ||
    typeof coordinates[0] !== 'number' ||
    typeof coordinates[1] !== 'number'
  ) {
    throw new ValidationError('The coordinates must be an array of two numbers')
  }
  const [latitude, longitude] = coordinates
  if (latitude < -90 || latitude > 90) throw new ValidationError('Latitude must be between -90 and 90 degrees')
  if (longitude < -180 || longitude > 180) throw new ValidationError('Length should be between -180 and 180 degrees')
}

const validateId = (id, explain = 'id') => {
  if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
  if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = (callback) => {
  if (typeof callback !== 'function') throw new ValidationError('callback is not a function')
}

const validate = {
  name: validateName,
  email: validateEmail,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  telephone: validateTelephone,
  image: validateImage,
  text: validateText,
  id: validateId,
  callback: validateCallback,
  role: validateRole,
  files: validateFiles,
  location: validateLocation,
}

export default validate
