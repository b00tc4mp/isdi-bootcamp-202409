import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const note = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    text: {
        type: String,
        required: true,
        maxLenght: 400
    }
}, { versionKey: false })

const reminder = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { versionKey: false })

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
    dateOfBirth: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'teacher'],
        default: 'student'
    },
    reminders: [reminder]
}, { versionKey: false })

const group = new Schema({
    name: {
        type: String,
        required: true,
    },
    teacher: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    students: [{
        type: ObjectId,
        ref: 'User'
    }]
}, { versionKey: false })


const task = new Schema({
    creator: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    assignes: [{
        type: ObjectId,
        required: true,
        ref: 'User'
    }],
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    text: {
        type: String,
        required: true,
        maxLenght: 400
    },
    viewed: [{
        type: ObjectId,
        required: true,
        ref: 'User'
    }],
}, { versionKey: false })

const User = model('User', user)
const Group = model('Group', group)
const Note = model('Note', note)
const Reminder = model('Reminder', reminder)
const Task = model('Task', task)

export {
    User,
    Group,
    Note,
    Reminder,
    Task
}