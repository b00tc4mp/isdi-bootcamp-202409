import errors from "./errors.js"

const { ValidationError } = errors

const validateName = (name) => {
  if (typeof name !== "string") throw new ValidationError("invalid name")
  if (name.length < 2) throw new ValidationError("invalid name length")
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

const validateEmailsMatch = (email, emailRepeat) => {
  if (typeof emailRepeat !== "string")
    throw new ValidationError("invalid email repeat")
  if (email.length > 320) throw new ValidationError("e-mail is too long")

  if (email !== emailRepeat) throw new ValidationError("emails do not match")
}

const validateRole = (role) => {
  if (typeof role !== "string") throw new ValidationError("invalid role")
  const validRoles = ["dancer", "organizer", "moderator"]
  if (!validRoles.includes(role)) throw new ValidationError("invalid role")
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

const validateImages = (images) => {
  // Verificar si images es un array
  if (!Array.isArray(images)) {
    throw new ValidationError("images must be an array")
  }

  // Validar que cada elemento del array sea un string
  if (!images.every((image) => typeof image === "string")) {
    throw new ValidationError("each file must be a string")
  }
}

const validateImage = (image) => {
  if (typeof image !== "string") throw new ValidationError(`invalid image`)
}

const validateText = (text) => {
  if (!text) throw new Error("the text is required")
  if (text.length > 200) throw new Error("text cannot exceed 200 characters")
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

function validateDate(date) {
  // Intenta convertir la fecha
  const parsedDate = new Date(date)

  // Verifica si la fecha es inválida
  if (isNaN(parsedDate.getTime())) {
    throw new ValidationError("invalid date format")
  }

  const now = new Date()
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(now.getFullYear() + 1)

  // Verifica si la fecha es pasada
  if (parsedDate < now) {
    throw new ValidationError("date must be in the future")
  }

  // Verifica si la fecha excede un año
  if (parsedDate > oneYearFromNow) {
    throw new ValidationError("date must not exceed one year from now")
  }
}

const validateLocation = (location) => {
  if (typeof location.address !== "string")
    throw new ValidationError("invalid location format")
  if (location.address.trim().length < 5)
    throw new ValidationError("location must be at least 5 characters")
  if (location.address.trim().length > 200)
    throw new ValidationError("location must not exceed 200 characters")
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
    throw new ValidationError("wrong type")
  }
}

const validate = {
  name: validateName,
  email: validateEmail,
  emailsMatch: validateEmailsMatch,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  images: validateImages,
  image: validateImage,
  text: validateText,
  id: validateId,
  callback: validateCallback,
  date: validateDate,
  location: validateLocation,
  role: validateRole,
  type: validateType,
}

export default validate
