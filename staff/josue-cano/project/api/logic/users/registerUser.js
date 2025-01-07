import bcrypt from "bcryptjs";
import { User } from "dat";
import { validate, errors } from "com";

const { DuplicityError, SystemError, ValidationError } = errors;

export default async ({ firstName, lastName, email, ubicacion, password, passwordRepeat }) => {
  validate.firstName(firstName);
  validate.lastName(lastName);
  validate.email(email);
  validate.password(password);
  validate.passwordsMatch(password, passwordRepeat);

  let hash;

  try {
    hash = await bcrypt.hash(password, 10);
  } catch (error) {
    throw new SystemError(error.message);
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new DuplicityError("user already exists");
  }
  try {
    await User.create({ firstName, lastName, email, ubicacion, password: hash });
  } catch (error) {
    throw new SystemError(error.message);
  }
};
