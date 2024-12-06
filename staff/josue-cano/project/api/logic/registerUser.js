import bcrypt from "bcryptjs";
import { User } from "dat";
import { validate, errors } from "com";

const { DuplicityError, SystemError } = errors;

export default ({ firstName, lastName, email, password, passwordRepeat }) => {
  validate.firstName(firstName);
  validate.lastName(lastName);
  validate.email(email);
  validate.password(password);
  validate.passwordsMatch(password, passwordRepeat);

  return bcrypt
    .hash(password, 10)
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((hash) =>
      User.create({ firstName, lastName, email, password: hash })
        .then((user) => ({...user.toObject(),password:null}) )
        .catch((error) => {
          if (error.code === 11000)
            throw new DuplicityError("user already exists");

          throw new SystemError(error.message);
        })
    );
};
