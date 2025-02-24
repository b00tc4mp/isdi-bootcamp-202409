import mongoose from 'mongoose'

const { Schema } = mongoose

const skill = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    manaCost: {
        type: Number,
        required: false
    },
    levelRequirement: {
        type: Number,
        required: true
    }
}, { versionKey: false })

export default skill