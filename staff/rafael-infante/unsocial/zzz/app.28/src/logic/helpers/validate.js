const validateName = name => {
  if (typeof name !== 'string') throw new Error
  if (name.length < 2)
    throw new Error('Invalid name')
}

const validateEmail = email => {
  if (typeof email !== 'string') throw new Error
  if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
    throw new Error('Invalid email')
}

const validateUsername = username => {
  if (typeof username !== 'string') throw new Error
  if (username.length < 4 || username.length > 12)
    throw new Error('invalid user name')
}

const validatePassword = password => {
  if (typeof password !== 'string') throw new Error
  if (password.length < 8)
    throw new Error('invalid password')
}

const validatePasswordsMatch = (password, confirmPassword) => {
  if (typeof confirmPassword !== 'string') throw new Error
  if (password !== confirmPassword)
    throw new Error('passwords do not match')
}

const validateImage = image => {
  if (typeof image !== 'string') throw new Error
}

const validateText = text => {
  if (typeof text !== 'string') throw new Error
}

const validateId = (id, explain = 'id') => {
  if (typeof id !== 'string') throw new Error(`invalid ${explain}`)
}

const validateCallback = callback => {
  if (typeof callback !== 'function') throw new Error('callback is not a function')
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