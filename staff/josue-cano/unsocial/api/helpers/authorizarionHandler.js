import { errors } from 'com'
import jwt from 'jsonwebtoken'

const { AuthorizationError } = errors

export default (req, res, next) => {
    try {
        console.log("authorization handler")
        const token = req.headers.authorization.slice(7)
        

        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = userId
        console.log(userId, req.userId)
        next()
    } catch (error) {
        next(new AuthorizationError(error.message))
    }
}