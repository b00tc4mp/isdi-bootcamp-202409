import { Request } from 'express'

interface CustomRequest extends Request {
    userId: string
}

export {
    CustomRequest
}