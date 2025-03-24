import mongoose from 'mongoose'

import { currency } from '../schemas/index.js'
import { CurrencyType } from '../types/index.js'

const { model } = mongoose

const Currency = model<CurrencyType>('Currency', currency)

export default Currency