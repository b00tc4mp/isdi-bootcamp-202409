import mongoose from 'mongoose'

const { Schema } = mongoose

const currency = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 50
    }
})

export default currency