import { model } from 'mongoose'

import { TCondition } from '../types/index.js'
import { condition } from '../schemas/index.js'

const Condition = model<TCondition>('Condition', condition, 'conditions')

export default Condition