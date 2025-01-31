import { errors } from 'com'
import jwt from 'jsonwebtoken'

const { AuthorizationError } = errors

export default (req, res, next) => {
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
        // Handle -specific errors
        return res.status(500).json({ success: false, error: 'Failed to authenticate token.', authError: true });

    }
}