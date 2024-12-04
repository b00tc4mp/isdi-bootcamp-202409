import mongoose from 'mongoose'

import { gameState } from '../schemas/index.js'
import { GameStateType } from '../types/index.js'

const { model } = mongoose

const GameState = model<GameStateType>('GameState', gameState)

export default GameState