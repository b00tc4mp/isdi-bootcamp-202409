import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const userSchema = new Schema({
    name: { type: String, required: true, minLength: 2},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
    },
    username: { type: String, required: true, unique: true, minLength: 3, maxLength: 30 },
    password: { type: String, required: true, minLength: 8},
    role: { type: String, required: true, enum: ['regular','admin'], default:'regular'}
},{versionKey: false });

const habitSchema = new Schema({
    name: { type: String, required: true },
    emoji: { type: String, maxLength: 4 },
    user: { type: ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    category: {
        type: String,
        enum: ['salud y bienestar', 'actividad física', 'desarrollo personal', 'negativos', 'finanzas', 'sociales'],
        required: true
    },
    subcategory: { type: String }
}, { versionKey: false });

const goalSchema = new Schema ({
    description: { type: String, required: true },
    period: { type: String, enum: ['weekly', 'monthly', 'yearly'], required: true },
    objective: { type: Number, required: true },
    user: { type: ObjectId, ref: 'User', required: true },
    habit: { type: ObjectId, ref: 'Habit', required: true }
}, { versionKey: false});

const progressSchema = new Schema({
    date: { type: Date, default: Date.now, required: true },
    status: { type: String, enum: ['done', 'missed', 'half-done'], required: true },
    habit: { type: ObjectId, ref: 'Habit', required: true }
}, { versionKey: false });

const eventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String},
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    frequency: { type: String, enum: ['once', 'daily', 'weekly', 'monthly'], default: 'once'},
    user: { type: ObjectId, ref: 'User', required: true },
    habit: { type: ObjectId, ref: 'Habit' },
    goal: { type: ObjectId, ref: 'Goal' }
}, { versionKey: false });

const User = model('User', userSchema)
const Habit = model('Habit', habitSchema)
const Goal = model('Goal', goalSchema)
const Progress = model('Progress', progressSchema)
const Event = model('Event', eventSchema)

export { User, Habit, Goal, Progress, Event}


