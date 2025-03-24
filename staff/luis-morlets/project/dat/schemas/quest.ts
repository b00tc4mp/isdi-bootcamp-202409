import mongoose from 'mongoose'

const { Schema, Types: { ObjectId } } = mongoose

const quest = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    parent: {
        type: ObjectId,
        ref: 'Quest',
        required: false
    }
}, { versionKey: false })

export default quest