import { Request } from 'express'
import { Types } from 'mongoose'

interface CustomRequest extends Request {
    userId: string
}

export {
    CustomRequest
}