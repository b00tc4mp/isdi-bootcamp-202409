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
    dateOfBirth: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'teacher'],
        default: 'student'
    }
}, { versionKey: false })

const group = new Schema({
    name: {
        type: String,
        required: true,
    },
    teachers: {
        type: [],
        required: false
    },
    students: {
        type: [],
        required: true
    }
}, { versionKey: false })

const note = new Schema({
    owner: {
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
    owner: {
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
        maxLenght: 200
    }
}, { versionKey: false })

const task = new Schema({
    from: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    to: [{
        type: String,
        required: true
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
    }
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