import { ObjectId } from 'mongoose'
import { GameStateType, SettingsType } from './index.js'

type PlayerType = {
    name: string,
    email: string,
    username: string,
    password: string,
    gamesState: ObjectId,
    settings: SettingsType
}

export default PlayerType