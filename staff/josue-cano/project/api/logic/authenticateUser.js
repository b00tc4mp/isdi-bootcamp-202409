import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "dat";
import { validate, errors } from "com";
const { SystemError, CredentialsError } = errors;

export default ({ email, password }) => {
  validate.email(email);
  validate.password(password);

  return (async () => {
    let user;

    try {
      user = await User.findOne({ email });
    } catch (error) {
      throw new SystemError(error.message);
    }

    if (!user) throw new CredentialsError("user does not exist");

    let match;

    try {
      match = await bcrypt.compare(password, user.password);
    } catch (error) {
      throw new CredentialsError(error.message);
    }

    if (!match) throw new CredentialsError("wrong credentials");

    const { _id: sub, firstName, lastName, email: mail } = { ...user.toObject() };
    
    const token = jwt.sign({sub, firstName, lastName, email: mail}, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return {
      token,
    };
  })();
};
