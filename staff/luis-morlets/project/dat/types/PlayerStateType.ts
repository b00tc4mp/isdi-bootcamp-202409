import { ObjectId } from 'mongoose'

type PlayerStateType = {
    player: ObjectId,
    quest: ObjectId,
    characters: [ObjectId],
    level: number
}

export default PlayerStateType