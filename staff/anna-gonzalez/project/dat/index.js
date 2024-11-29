import { connect, disconnect } from 'mongoose'
import { User, DayLog, Cycle, Reminder, Tip } from './models.js'
import './boost-mongoose.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    DayLog,
    Cycle,
    Reminder,
    Tip
}