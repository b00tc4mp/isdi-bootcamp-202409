import { ObjectId } from 'mongoose'
import CharacterType from './CharacterType.js'

type PlayerStateType = {
    player: ObjectId,
    quest: ObjectId,
    characters: [CharacterType],
    level: number
}

export default PlayerStateType