import mongoose from 'mongoose'

const { Schema } = mongoose

const monsterAction = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['melee', 'ranged']
    }
}, { versionKey: false })

export default monsterAction