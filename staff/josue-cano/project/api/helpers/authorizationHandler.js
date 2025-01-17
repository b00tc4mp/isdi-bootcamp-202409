import { errors } from "com";
import jwt from "jsonwebtoken";

const { AuthorizationError } = errors;

export default (req, _res, next) => {

  const token = req.headers.authorization?.slice(7);

  if (!token) {
    throw new Error("Auth token missing"); // next(new AuthorizationError(error.message));
    // return next(new AuthorizationError("No token provided"));
  }

  try {
    const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = userId;

    next();
  } catch (error) {
    return _res.status(401).json({ error: error.message }); // next(new AuthorizationError(error.message));
  }
};
