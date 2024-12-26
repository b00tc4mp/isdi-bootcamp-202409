import mongoose from 'mongoose'

import { ItemType } from '../types/index.js'
import { item } from '../schemas/index.js'

const { model } = mongoose

const Item = model<ItemType>('Item', item)

export default Item