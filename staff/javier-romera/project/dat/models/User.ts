import { model, Schema } from 'mongoose'


const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 12
    },
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
    }
}, { versionKey: false })

const User = model('User', user)

export default User