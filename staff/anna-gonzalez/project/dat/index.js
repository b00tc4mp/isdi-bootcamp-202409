import { connect, disconnect } from 'mongoose'
import { User, Cycle, DailyLog, Reminder, Tip } from './models.js'
import './boost-mongoose.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    Cycle,
    DailyLog,
    Reminder,
    Tip
}