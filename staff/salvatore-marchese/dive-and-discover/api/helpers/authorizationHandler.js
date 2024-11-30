import { errors } from 'com'
import jwt from 'jsonwebtoken'

const { AuthorizationError } = errors

export default (req, next) => {
    try {
        // Check if Authorization header exists and is valid
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            throw new AuthorizationError('Authorization header is missing or invalid')
        }

        // Extract token (after "Bearer ")
        const token = req.headers.authorization.slice(7)

        // Verify token
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        // Attach claims to the request object
        req.userId = userId

        // Call next middleware
        next()
    } catch (error) {
        // Handle JWT-specific errors
        if (error.name === 'TokenExpiredError') {
            next(new AuthorizationError('Token has expired'))
        } else if (error.name === 'JsonWebTokenError') {
            next(new AuthorizationError('Invalid token'))
        } else {
            next(new AuthorizationError(error.message))
        }
    }
}