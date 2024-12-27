import { errors } from 'com'
import { NextFunction, Request, Response } from 'express'

const { ValidationError, SystemError, DuplicityError, CredentialsError, NotFoundError, OwnershipError, AuthorizationError } = errors

export default (error: Error, req: Request, res: Response, next: NextFunction): void => {
    let status = 500

    switch (true) {
        case (error instanceof ValidationError):
            status = 406
            break
        case (error instanceof NotFoundError):
            status = 404
            break
        case (error instanceof CredentialsError):
            status = 401
            break
        case error instanceof AuthorizationError:
            status = 401
            break
        case (error instanceof DuplicityError):
            status = 409
            break
        case (error instanceof OwnershipError):
            status = 403
            break
    }

    res.status(status).json({ error: status === 500 ? SystemError.name : error.constructor.name, message: error.message })

    console.error(error)
}