import mongoose from 'mongoose'

import { inventory } from '../schemas/index.js'
import { InventoryType } from '../types/index.js'

const { model } = mongoose

const Inventory = model<InventoryType>('Inventory', inventory)

export default Inventory