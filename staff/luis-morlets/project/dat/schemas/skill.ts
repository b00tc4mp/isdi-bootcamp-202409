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
    levelRequirement: {
        type: Number,
        required: true
    }
}, { versionKey: false })

export default skill