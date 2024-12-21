import { NextFunction, Request, Response } from 'express'

export default (callback: Function) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await callback(req, res)
        } catch (error) {
            next(error)
        }
    }