import mongoose from 'mongoose'

import { monsterAction } from '../schemas/index.js'
import { MonsterActionType } from '../types/index.js'

const { model } = mongoose

const MonsterAction = model<MonsterActionType>('MonsterAction', monsterAction)

export default MonsterAction