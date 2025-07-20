import { Schema } from 'mongoose'

const user = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 16
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    role: {
        type: String,
        required: true,
        enum: ['regular', 'anonymous'],
        default: 'regular'
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    rank: {
        type: String,
        required: true,
        default: 'Rookie'
    },
    status: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3],
        default: 0
    }
}, { versionKey: false })

export default user