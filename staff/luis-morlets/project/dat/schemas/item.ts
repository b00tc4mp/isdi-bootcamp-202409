import mongoose from 'mongoose'

const { Schema } = mongoose

const item = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    buyPrice: {
        type: Number,
        enum: [15, 30, 20],
        required: false
    },
    sellPrice: {
        type: Number,
        enum: [2, 5, 30, 6, 7, 12, 15, 10],
        required: false
    },
    type: {
        type: String,
        required: true,
        enum: ['material', 'damage', 'consumable', 'currency', 'artifact']
    },
    effect: {
        type: String,
        required: false
    }
}, { versionKey: false })

export default item