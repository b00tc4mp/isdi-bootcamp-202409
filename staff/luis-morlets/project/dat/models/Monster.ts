import mongoose from 'mongoose'

import { monster } from '../schemas/index.js'
import { MonsterType } from '../types/index.js'

const { model } = mongoose

const Monster = model<MonsterType>('Monster', monster)

export default Monster
