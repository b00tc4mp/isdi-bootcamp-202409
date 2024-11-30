import errors from "./errors.js"

const { ValidationError } = errors

const validateName = (name) => {
  if (typeof name !== "string") throw new ValidationError("Invalid name")
  if (name.length < 2) throw new ValidationError("Invalid name length")
}

const validateEmail = (email) => {
  if (typeof email !== "string") throw new ValidationError("Invalid e-mail")
  if (email.length > 320) throw new ValidationError("E-mail is too long")
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  )
    throw new ValidationError("Invalid e-mail")
}

const validatePassword = (password) => {
  if (typeof password !== "string")
    throw new ValidationError("Invalid password")
  if (password.length < 8) throw new ValidationError("Invalid password length")
  if (password.length > 128) throw new ValidationError("Password is too long")
}

const validatePasswordsMatch = (password, passwordRepeat) => {
  if (typeof passwordRepeat !== "string")
    throw new ValidationError("Invalid password repeat")
  if (passwordRepeat.length > 128)
    throw new ValidationError("Password is too long")
  if (password !== passwordRepeat)
    throw new ValidationError("Passwords do not match")
}

const validateImage = (image) => {
  if (typeof image !== "string") throw new ValidationError("Invalid image")

  if (image.length > 200) throw new ValidationError("Image URL is too long")

  if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(image)) {
    throw new ValidationError("Image URL must point to a valid image file")
  }
}

const validateText = (text) => {
  if (typeof text !== "string") throw new ValidationError("Invalid text")
}

const validateId = (id, explain = "id") => {
  if (typeof id !== "string") throw new ValidationError(`Invalid ${explain}`)
  if (id.length !== 24) throw new ValidationError(`Invalid ${explain} length`)
}

const validateCallback = (callback) => {
  if (typeof callback !== "function")
    throw new ValidationError("Invalid callback")
}

const validateDate = (date) => {
  const parsedDate = new Date(date)

  if (isNaN(parsedDate)) throw new ValidationError("Invalid date")

  const now = new Date()
  if (parsedDate <= now)
    throw new ValidationError("The date must be in the future")

  const oneYearFromNow = new Date()
  //agregamos un año a la fecha
  oneYearFromNow.setFullYear(now.getFullYear() + 1)
  if (parsedDate > oneYearFromNow) {
    throw new ValidationError("Date greater than one year")
  }
}

const validateLocation = (location) => {
  if (typeof location.address !== "string")
    throw new ValidationError("Invalid location format")
  if (location.address.trim().length < 5)
    throw new ValidationError("Location must be at least 5 characters")
  if (location.address.trim().length > 100)
    throw new ValidationError("Location must not exceed 100 characters")

  const { coordinates } = location

  if (
    !Array.isArray(coordinates) ||
    coordinates.length !== 2 ||
    typeof coordinates[0] !== "number" ||
    typeof coordinates[1] !== "number"
  ) {
    throw new ValidationError("The coordinates must be an array of two numbers")
  }
  const [latitude, longitude] = coordinates

  if (latitude < -90 || latitude > 90)
    throw new ValidationError("Latitude must be between -90 and 90 degrees")
  if (longitude < -180 || longitude > 180)
    throw new ValidationError("Length should be between -180 and 180 degrees")
}

const validate = {
  name: validateName,
  email: validateEmail,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  image: validateImage,
  text: validateText,
  id: validateId,
  callback: validateCallback,
  date: validateDate,
  location: validateLocation,
}

export default validate
