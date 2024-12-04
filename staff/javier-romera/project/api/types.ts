import { Request } from 'express'

interface CustomRequest extends Request {
    userId: string
}

type Payload = {
    id: string,
    role: string
}

export {
    CustomRequest,
    Payload
}