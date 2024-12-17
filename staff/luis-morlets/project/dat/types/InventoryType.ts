import { ObjectId } from 'mongoose'

type InventoryType = {
    items: [ObjectId]
    currency: number
}

export default InventoryType