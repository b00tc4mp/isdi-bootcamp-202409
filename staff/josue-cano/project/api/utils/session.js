import jwt from "jsonwebtoken"

function validateToken(token) {
  try {
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return false;
    } else if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return false;
    } else {
      // If the token is valid, return some protected data.
      return true;
    }
  } catch (error) {
    console.error("Token verification failed", error);
    return false;
  }
}

export default validateToken