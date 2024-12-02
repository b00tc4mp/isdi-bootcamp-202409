import { Request } from 'express'
import { Types } from 'mongoose'

interface IRequest extends Request {
    userId: string
}

type TPlayer = {
    _id: Types.ObjectId,
    name: string,
    email: string,
    username: string,
    password: string,
    settings: []
}

export {
    IRequest,
    TPlayer
}