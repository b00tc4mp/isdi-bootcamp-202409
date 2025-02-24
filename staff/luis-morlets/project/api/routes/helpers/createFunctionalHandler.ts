import { NextFunction, Request, Response } from 'express'

export default (callback: Function) => (req: Request, res: Response, next: NextFunction) => {
    try {
        callback(req, res)
            .catch(next)
    } catch (error) {
        next(error)
    }
}