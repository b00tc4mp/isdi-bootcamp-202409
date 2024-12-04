import mongoose from 'mongoose'

const { Schema, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        requiered: true,
        enum: ['diver', 'center'],
        default: 'diver'
    },
        coords: {
            type: {
                x: Number,
                y: Number
            },
            default: {
                x: 0,
                y: 0
            }
    }
}, { versionKey: false })

const User = model('User', user)

export {
    User
}