import mongoose from 'mongoose'

import { player } from '../schemas/index.js'
import { PlayerType } from '../types/index.js'

const { model } = mongoose

const Player = model<PlayerType>('Player', player)

export default Player