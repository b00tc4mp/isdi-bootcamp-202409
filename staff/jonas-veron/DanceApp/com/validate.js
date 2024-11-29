import errors from "./errors.js"

const { ValidationError } = errors

const validateName = (fullName) => {
  if (typeof fullName !== "string") throw new ValidationError("invalid name")
  if (fullName.length < 2) throw new ValidationError("invalid name length")
}

const validateEmail = (email) => {
  if (typeof email !== "string") throw new ValidationError("invalid e-mail")
  if (email.length > 320) throw new ValidationError("e-mail is too long")
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  )
    throw new ValidationError("invalid e-mail")
}

const validatePassword = (password) => {
  if (typeof password !== "string")
    throw new ValidationError("invalid password")
  if (password.length < 8) throw new ValidationError("invalid password length")
  if (password.length > 128) throw new ValidationError("password is too long")
}

const validatePasswordsMatch = (password, passwordRepeat) => {
  if (typeof passwordRepeat !== "string")
    throw new ValidationError("invalid password repeat")
  if (passwordRepeat.length > 128)
    throw new ValidationError("password is too long")
  if (password !== passwordRepeat)
    throw new ValidationError("passwords do not match")
}

const validateImage = (image) => {
  if (typeof image !== "string") throw new ValidationError("Invalid image URL")

  if (image.length > 200) throw new ValidationError("Image URL is too long")

  if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(image)) {
    throw new ValidationError("Image URL must point to a valid image file")
  }
}

const validateText = (text) => {
  if (typeof text !== "string") throw new ValidationError("invalid text")
}

const validateId = (id, explain = "id") => {
  if (typeof id !== "string") throw new ValidationError(`invalid ${explain}`)
  if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = (callback) => {
  if (typeof callback !== "function")
    throw new ValidationError("invalid callback")
}

const validate = {
  fullName: validateName,
  email: validateEmail,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  image: validateImage,
  text: validateText,
  id: validateId,
  callback: validateCallback,
}

export default validate
