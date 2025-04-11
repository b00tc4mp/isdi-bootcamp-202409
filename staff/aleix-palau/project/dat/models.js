import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String,
        minLength: 2
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
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['Man', 'Woman', 'Nonbinary']
    },
    targetGender: [{
        type: String,
        enum: ['Men', 'Women', 'Nonbinary people']
    }],
    coordinates: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number]  // [longitude, latitude]
        }
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    pictures: [{
        type: String
    }],
    profilePicture: {
        type: String
    },
    minAge: {
        type: Number,
        default: 18,
        min: 18,
        max: 54
    },
    maxAge: {
        type: Number,
        default: 55,
        min: 19,
        max: 55
    },
    distance: {
        type: Number,
        default: 100
    },
    artists: [{
        type: String
    }],
    spotifyId: {
        type: String
    },
    spotifyAccessToken: {
        type: String
    },
    spotifyRefreshToken: {
        type: String
    },
    spotifyTrackId: {
        type: String
    },
    track: {
        type: String
    },
    artist: {
        type: String
    },
    playedOn: {
        type: Date
    },
    stage: {
        type: String,
        enum: ['name-dob', 'gender', 'artists', 'completed'],
        default: 'name-dob'
    }
}, { versionKey: false })

user.index({ coordinates: '2dsphere' }) // Geospatial index for location queries

const heartbeat = new Schema({
    sender: {
        type: ObjectId,
        ref: 'User'
    },
    receiver: {
        type: ObjectId,
        ref: 'User'
    },
    action: {
        type: String,
        enum: ['left', 'right']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const message = new Schema({
    sender: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, _id: true }) // Ensure messages get their own _id

const match = new Schema({
    users: [{
        type: ObjectId,
        ref: 'User'
    }],
    messages: [message],
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActivity: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

match.index({ users: 1 }) // Index for efficient querying of matches by user
match.index({ users: 1, lastActivity: -1 }) // Index for potentially sorting by last activity

const notification = new Schema({
    from: {
        type: ObjectId,
        ref: 'User'
    },
    to: {
        type: ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['match', 'message']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const User = model('User', user)
const Heartbeat = model('Heartbeat', heartbeat)
const Match = model('Match', match)
const Notification = model('Notification', notification)

export {
    User,
    Heartbeat,
    Match,
    Notification
}