import { Request } from 'express'

interface IRequest extends Request {
    playerId: string
}

export default IRequest