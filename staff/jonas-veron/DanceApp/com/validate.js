import errors from "./errors.js"

const { ValidationError } = errors

const validateName = (name) => {
  if (typeof name !== "string") throw new ValidationError("Invalid name")
  if (name.length < 2) throw new ValidationError("Invalid name length")
}

const validateEmail = (email) => {
  if (typeof email !== "string") throw new ValidationError("E-mail inválido")
  if (email.length > 320) throw new ValidationError("E-mail is too long")
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  )
    throw new ValidationError("Invalid e-mail")
}

const validateRole = (role) => {
  if (typeof role !== "string") throw new ValidationError("Invalid Role")
  const validRoles = ["dancer", "organizer", "moderator"]
  if (!validRoles.includes(role)) throw new ValidationError("Invalid Role")
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

const validateImages = (images) => {
  if (!Array.isArray(images)) {
    throw new ValidationError("Images must be an array")
  }

  if (!images.every((images) => typeof images === "string")) {
    throw new ValidationError("Each file must be a string")
  }
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
  // Intenta convertir la fecha
  const parsedDate = new Date(date)

  // Verifica si la fecha es inválida
  if (isNaN(parsedDate.getTime())) {
    throw new ValidationError("Invalid date format")
  }

  const now = new Date()
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(now.getFullYear() + 1)

  // Verifica si la fecha es pasada
  if (parsedDate < now) {
    throw new ValidationError("Date must be in the future")
  }

  // Verifica si la fecha excede un año
  if (parsedDate > oneYearFromNow) {
    throw new ValidationError("Date must not exceed one year from now")
  }
}

const validateLocation = (location) => {
  if (typeof location.address !== "string")
    throw new ValidationError("Invalid location format")
  if (location.address.trim().length < 5)
    throw new ValidationError("Location must be at least 5 characters")
  if (location.address.trim().length > 200)
    throw new ValidationError("Location must not exceed 200 characters")
}

const validateType = (type) => {
  const validTypes = [
    "Sociales",
    "Escuelas de baile",
    "Clases particulares",
    "Congresos",
    "Masterclases",
  ]

  if (!validTypes.includes(type)) {
    throw new ValidationError("Wrong type")
  }
}

const validate = {
  name: validateName,
  email: validateEmail,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  images: validateImages,
  text: validateText,
  id: validateId,
  callback: validateCallback,
  date: validateDate,
  location: validateLocation,
  role: validateRole,
  type: validateType,
}

export default validate
