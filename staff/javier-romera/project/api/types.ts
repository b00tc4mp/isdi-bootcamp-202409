import { Request } from 'express'

interface CustomRequest extends Request {
    userId: string
}

type Payload = {
    id: string,
    role: string
}

type UserScoreAndUsername = {
    username: string,
    score: number
}

export {
    CustomRequest,
    Payload,
    UserScoreAndUsername
}