//import { errors } from '../../../com/errors.js' //import { errors } from '../../com/'
import errors from '../../../com/errors.js'
import jwt from 'jsonwebtoken'

const { AuthorizationError } = errors

const authorizationHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = userId

        next()

    } catch (error) {
        next(new AuthorizationError(error.message))
    }
}

export default authorizationHandler