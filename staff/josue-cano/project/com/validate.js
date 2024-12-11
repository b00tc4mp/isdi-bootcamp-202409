import errors from "./errors.js";

const { ValidationError } = errors;

const validateUsername = (userName) => {
  if (typeof userName !== "string")
    throw new ValidationError("invalid username");
  if (userName.length < 2) throw new ValidationError("invalid username length");
};

const validatefirstName = (firstName) => {
  if (typeof firstName !== "string") throw new ValidationError("invalid name");
  if (firstName.length < 2) throw new ValidationError("invalid name length");
};

const validateEmail = (email) => {
  if (typeof email !== "string") throw new ValidationError("invalid email");
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  )
    throw new ValidationError("invalid e-mail");
};

const lastName = (lastName) => {
  if (typeof lastName !== "string")
    throw new ValidationError("invalid lastName");
  if (lastName.length < 3 || lastName.length > 30)
    throw new ValidationError("invalid lastName length");
};

const validatePassword = (password) => {
  if (typeof password !== "string")
    throw new ValidationError("invalid password");
  if (password.length < 8) throw new ValidationError("invalid password length");
};

const validatePasswordsMatch = (password, passwordRepeat) => {
  if (typeof passwordRepeat !== "string")
    throw new ValidationError("invalid password repeat");
  if (password !== passwordRepeat)
    throw new ValidationError("passwords do not match");
};

const validateImage = (image) => {
  if (typeof image !== "string") throw new ValidationError("invalid image");
};

const validateText = (text) => {
  if (typeof text !== "string") throw new ValidationError("invalid text");
};

const validateId = (id, explain = "id") => {
  if (typeof id !== "string") throw new ValidationError(`invalid ${explain}`);
  if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`);
};

const validateCallback = (callback) => {
  if (typeof callback !== "function")
    throw new ValidationError("invalid callback");
};

const validate = {
  firstName: validatefirstName,
  email: validateEmail,
  lastName: lastName,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  image: validateImage,
  text: validateText,
  id: validateId,
  callback: validateCallback,
  userName: validateUsername,
};

export default validate;