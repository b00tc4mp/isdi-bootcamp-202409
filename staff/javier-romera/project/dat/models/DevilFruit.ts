import { model } from 'mongoose'

import { TDevilFruit } from '../types/index.js'
import { devilFruit } from '../schemas/index.js'

const DevilFruit = model<TDevilFruit>('DevilFruit', devilFruit, 'devilFruits')

export default DevilFruit