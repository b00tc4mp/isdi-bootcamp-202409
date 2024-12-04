import mongoose from 'mongoose'

const { Schema } = mongoose

const settings = new Schema({
    music: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    brightness: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
    },
    language: {
        type: String,
        enum: ['español', 'english'],
        default: 'english',
        required: false
    }
}, { versionKey: false })

export default settings