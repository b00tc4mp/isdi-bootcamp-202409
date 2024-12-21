import { Schema } from 'mongoose'

const arc = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: Number,
        unique: true,
        required: true
    }
}, { versionKey: false })

export default arc