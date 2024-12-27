import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10
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
    }
}, { versionKey: false })

const dayLog = new Schema({
    date: {
        type: Date,
        required: true
    },
    symptoms: [{
        type: String,
        enum: ['fatigue', 'headache', 'cramps', 'tender breasts', 'acne', 'backache', 'cravings', 'abdominal pain', 'dryness'],
        required: false
    }],
    mood: {
        type: String,
        enum: ['calm', 'energetic', 'happy', 'mood swings', 'sad', 'apathetic', 'anxious'],
        required: false,
    },
    flow: {
        type: String,
        enum: ['no discharge', 'creamy', 'watery'],
        required: false
    },
    sleep: {
        type: String,
        enum: ['poor', 'average', 'good'],
        required: false
    },
    sexualActivity: {
        type: String,
        enum: ['no sex', 'sex'],
        required: false
    },
    sexualEnergy: {
        type: String,
        enum: ['low', 'moderate', 'high'],
        required: false
    }
}, { versionKey: false })

const cycle = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date
    },
    periodEnd: {
        type: Date
    },
    dayLogs: [dayLog]
}, { versionKey: false })

const reminder = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    }
}, { versionKey: false })

const tip = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    phase: {
        type: String,
        enum: ['menstruation', 'follicular', 'ovulation', 'luteal'],
        required: true
    },
    category: {
        type: String,
        enum: ['nutrition', 'exercise', 'self-care', 'music'],
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 200
    }
}, { versionKey: false })

const User = model('User', user)
const DayLog = model('DayLog', dayLog)
const Cycle = model('Cycle', cycle)
const Reminder = model('Reminder', reminder)
const Tip = model('Tip', tip)

export {
    User,
    DayLog,
    Cycle,
    Reminder,
    Tip
}