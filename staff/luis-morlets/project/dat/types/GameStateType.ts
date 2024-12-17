import { ObjectId } from 'mongoose'
import PlayerStateType from './PlayerStateType.js'

type GameStateType = {
    createdAt: Date,
    playerStates: [PlayerStateType]
    inventory: [ObjectId]
}

export default GameStateType