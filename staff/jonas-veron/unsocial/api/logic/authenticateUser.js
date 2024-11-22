import bcrypt from "bcryptjs";

import { User } from "dat";
import { validate, errors } from "com";
const { SystemError, CredentialsError } = errors;

export default (username, password) => {
  validate.username(username);
  validate.password(password);

  return User.findOne({ username })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new CredentialsError("wrong credentials");

      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) throw new CredentialsError("wrong credentials");
        return {
          id: user._id.toString(),
          role: user.role,
        };
      });
    });
};
