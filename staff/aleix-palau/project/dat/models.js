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
        enum: ['male', 'female', 'nonbinary']
    },
    preferredGender: [{
        type: String,
        enum: ['male', 'female', 'nonbinary']
    }],
    coordinates: {
        type: Array, // [latitude, longitude]
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    bio: {
        type: String
    },
    images: [{
        type: String
    }],
    minAge: {
        type: Number,
        default: 18,
        min: 18,
        max: 100
    },
    maxAge: {
        type: Number,
        default: 100,
        min: 18,
        max: 100
    },
    distance: {
        type: Number,
        default: 50
    },
    genres: [{
        type: String
    }],
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
    }
}, { versionKey: false })

user.virtual('age').get(function () {
    if (!this.dateOfBirth) return null

    const today = new Date()
    const birthDate = new Date(this.dateOfBirth)

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    return age
})

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

const music = new Schema({
    sharedBy: {
        type: ObjectId,
        ref: 'User'
    },
    spotifyTrack: {
        type: String
    },
    track: {
        type: String
    },
    artist: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const message = new Schema({
    author: {
        type: ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['text', 'music'],
        default: 'text'
    },
    music: {
        type: music
    }
}, { versionKey: false })

const match = new Schema({
    users: [{
        type: ObjectId,
        ref: 'User'
    }],
    messages: [message]
}, { versionKey: false })

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

user.set('toObject', { virtuals: true })
user.set('toJSON', { virtuals: true })

const User = model('User', user)
const Heartbeat = model('Heartbeat', heartbeat)
const Music = model('Music', music)
const Message = model('Message', message)
const Match = model('Match', match)
const Notification = model('Notification', notification)

export {
    User,
    Heartbeat,
    Music,
    Message,
    Match,
    Notification
}