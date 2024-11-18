import { errors } from 'com'
import jwt from 'jsonwebtoken'

const { AuthorizationError } = errors

export default (req, res, next) => {
    try {
        //const userId = req.headers.authorization.slice(6)
        //Con el token ahora buscamos a partir del carácter 7
        const token = req.headers.authorization.slice(7)

        //req.userId = userId
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = userId

        next()

    } catch (error) {
        //next(error)
        next(new AuthorizationError(error.message))
    }
}