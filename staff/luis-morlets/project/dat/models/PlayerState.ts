import mongoose from 'mongoose'

import { playerState } from '../schemas/index.js'
import { PlayerStateType } from '../types/index.js'

const { model } = mongoose

const PlayerState = model<PlayerStateType>('PlayerState', playerState)

export default PlayerState