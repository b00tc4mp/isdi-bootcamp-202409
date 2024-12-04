import { errors } from 'com'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import IRequest from '../../types.js'

const { AuthorizationError } = errors

export default (req: IRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization!.slice(7)

        const { sub: playerId } = jwt.verify(token, process.env.JWT_SECRET!)

        if (playerId)
            req.playerId = playerId as string

        next()
    } catch (error) {
        next(new AuthorizationError((error as Error).message))
    }
}
