import { errors } from 'com'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CustomRequest } from '../types.js'

const { AuthorizationError } = errors

export default (req: CustomRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization!.slice(7)

        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET!)

        if (userId)
            req.userId = userId as string

        next()
    } catch (error) {
        if (error instanceof AuthorizationError)
            next(new AuthorizationError(error.message))
    }
}