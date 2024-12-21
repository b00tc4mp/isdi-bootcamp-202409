import { Schema } from 'mongoose'

const devilFruit = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    }
}, { versionKey: false })

export default devilFruit