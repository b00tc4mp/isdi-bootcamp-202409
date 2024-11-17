import { errors } from 'com'
import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const { sub: userId } = jew.verify(token, process.env.JWT_SECRET)

        req.userId = userId

        next()
    } catch (error) {
        next(new AuthorizationError(error.message))
    }
}