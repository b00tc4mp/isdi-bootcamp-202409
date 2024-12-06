import { model } from 'mongoose'

import { TArc } from '../types/index.js'
import { arc } from '../schemas/index.js'

const Arc = model<TArc>('Arc', arc, 'arcs')

export default Arc