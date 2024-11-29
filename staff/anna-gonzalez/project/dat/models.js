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
        type: Date,
        required: false
    },
    periodEnd: {
        type: Date,
        required: true
    },
    dailyLogs: [{
        ref: 'DailyLog'
    }]
})

const dailyLog = new Schema({
    cycle: {
        type: ObjectId,
        required: true,
        ref: 'Cycle'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    symptoms: {
        type: String,
        enum: ['fatigue', 'headache', 'cramps', 'tender breasts', 'acne', 'backache', 'cravings', 'abdominal pain', 'dryness'],
        required: true,
        default: []
    },
    mood: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
        default: []
    },
    energy: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
        default: []
    },
    flow: {
        type: String,
        enum: ['no discharge', 'creamy', 'watery'],
        required: true,
        default: []
    },
    sleep: {
        type: String,
        enum: ['poor', 'average', 'good'],
        required: true,
        default: []
    },
    sexualActivity: {
        type: String,
        enum: ['did not have sex', 'had sex'],
        required: true,
        default: []
    },
    sexualEnergy: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
        default: []
    }
})

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
})

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
})

const User = model('User', user)
const Cycle = model('Cycle', cycle)
const DailyLog = model('DailyLog', dailyLog)
const Reminder = model('Reminder', reminder)
const Tip = model('Tip', tip)

export {
    User,
    Cycle,
    DailyLog,
    Reminder,
    Tip
}