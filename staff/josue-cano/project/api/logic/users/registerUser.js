import bcrypt from "bcryptjs";
import { User } from "dat";
import { validate, errors } from "com";

const { DuplicityError, SystemError, ValidationError } = errors;

export default async ({ firstName, lastName, email, location, password, passwordRepeat }) => {
  try {
    validate.firstName(firstName);
    validate.lastName(lastName);
    validate.email(email);
    validate.password(password);
    validate.passwordsMatch(password, passwordRepeat);
  } catch (err) {
    // return Promise.reject para emitir una promesa de respuesta fallida
    // Los valores de respuesta pueden ser: resolve = exito, reject = fallo
    return Promise.reject(err.message);
  }
  try {
    return bcrypt
      .hash(password, 10)
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((hash) =>
        User.create({ firstName, lastName, email, location, password: hash })
          .then((user) => ({ ...user.toObject(), password: null }))
          .catch((error) => {
            if (error.code === 11000) throw new DuplicityError("user already exists");

            throw new SystemError(error.message);
          })
      );
  } catch (err) {
    // return Promise.reject para emitir una promesa de respuesta fallida
    // Los valores de respuesta pueden ser: resolve = exito, reject = fallo
    return Promise.reject(err.message);
  }
};
