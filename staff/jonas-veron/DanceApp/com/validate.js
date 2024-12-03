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
  if (!image) throw new Error("You must provide an image.")

  // const validTypes = ["image/jpeg", "image/png", "image/gif"]
  // if (!validTypes.includes(image.type)) {
  //   throw new Error("The image must be a JPG, PNG or GIF file.")
  // }

  const maxSize = 5 * 1024 * 1024 // 5MB
  if (image.size > maxSize) {
    throw new Error("Image size should not exceed 5MB.")
  }
}
const validateFiles = (files) => {
  if (!(files instanceof Array)) throw new Error("Files is not an array")
}
const validateText = (text) => {
  if (!text) throw new Error("The text is required.")
  if (text.length > 200) throw new Error("Text cannot exceed 200 characters.")
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

function validateDate(date) {
  const parsedDate = new Date(date)

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format")
  }

  const now = new Date()
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(now.getFullYear() + 1)

  if (parsedDate < now) {
    throw new Error("Date must be in the future")
  }

  if (parsedDate > oneYearFromNow) {
    throw new Error("Date must not exceed one year from now")
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
  files: validateFiles,
  text: validateText,
  id: validateId,
  callback: validateCallback,
  date: validateDate,
  location: validateLocation,
}

export default validate
