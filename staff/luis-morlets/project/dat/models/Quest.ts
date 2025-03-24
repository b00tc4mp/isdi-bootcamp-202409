import mongoose from 'mongoose'

import { quest } from '../schemas/index.js'
import { QuestType } from '../types/index.js'

const { model } = mongoose

const Quest = model<QuestType>('Quest', quest)

export default Quest