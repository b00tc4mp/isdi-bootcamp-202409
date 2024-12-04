import mongoose from 'mongoose'

import { stats } from '../schemas/index.js'
import { StatsType } from '../types/index.js'

const { model } = mongoose

const Stats = model<StatsType>('Stats', stats)

export default Stats