import { ObjectId } from 'mongoose'

type GameStateType = {
    host: ObjectId,
    status: string,
    createdAt: Date,
    inventory: [ObjectId],
    characters: [ObjectId]
}

export default GameStateType