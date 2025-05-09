import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
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
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        required: true,
        enum: ['regular', 'moderator'],
        default: 'regular'
    },
    interests: {
        type: String
    },
    gender: {
        type: String
    },
    languages: {
        type: String
    },
    age: {
        type: Number
    },
}, { versionKey: false })

const meet = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    joinedId: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },

    interests: {
        type: [String],
        required: true
    },
    trending: {
        type: [String]
    },

    location: {
        type: [Number], // [longitude, latitude]
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        default: ''
    }, // Optional
    placeName: {
        type: String,
        default: ''
    } // Optinonal
}, { versionKey: false }
)


const User = model('User', user)
const Meet = model('Meet', meet)

export {
    User,
    Meet
}