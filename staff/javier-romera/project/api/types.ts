import { Request } from 'express'

interface CustomRequest extends Request {
    userId: string
}

type Payload = {
    id: string,
    role: string
}

type UserDetails = {
    username: string,
    score: number,
    email: string,
    index?: number
}

export {
    CustomRequest,
    Payload,
    UserDetails
}