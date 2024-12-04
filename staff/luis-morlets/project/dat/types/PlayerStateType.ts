import { ObjectId } from 'mongoose'

type PlayerStateType = {
    player: ObjectId,
    quest: ObjectId,
    character: ObjectId,
    level: number
}

export default PlayerStateType