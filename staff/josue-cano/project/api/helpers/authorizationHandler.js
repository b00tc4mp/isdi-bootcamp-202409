import { errors } from "com";
import jwt from "jsonwebtoken";

const { AuthorizationError } = errors;

export default (req, res, next) => {
  console.log("entrando en authorization handler");

  const token = req.headers.authorization?.slice(7);

  if (!token) {
    return next(new AuthorizationError("No token provided"));
  }

  try {
    const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = userId;

    next();
  } catch (error) {
    return next(new AuthorizationError(error.message));
  }
};
