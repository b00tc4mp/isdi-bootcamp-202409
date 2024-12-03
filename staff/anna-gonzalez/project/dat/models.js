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
        required: true,
        default: Date.now
    },
    symptoms: {
        type: String,
        enum: ['fatigue', 'headache', 'cramps', 'tender breasts', 'acne', 'backache', 'cravings', 'abdominal pain', 'dryness'],
        required: true
    },
    mood: {
        type: String,
        enum: ['calm', 'happy', 'mood swings', 'sad', 'anxious'],
        required: true,
    },
    energy: {
        type: String,
        enum: ['low', 'moderate', 'high'],
        required: true,
    },
    flow: {
        type: String,
        enum: ['no discharge', 'creamy', 'watery'],
        required: true
    },
    sleep: {
        type: String,
        enum: ['poor', 'average', 'good'],
        required: true
    },
    sexualActivity: {
        type: String,
        enum: ['no sex', 'sex'],
        required: true
    },
    sexualEnergy: {
        type: String,
        enum: ['low', 'moderate', 'high'],
        required: true
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
    dayLogs: [{
        type: dayLog,
        ref: 'DayLog'
    }]
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
        maxLength: 20
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