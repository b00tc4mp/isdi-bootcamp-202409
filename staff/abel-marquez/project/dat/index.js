import { connect, disconnect} from 'mongoose'
import { User, Habit, Goal, Progress, Event } from './models.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    Habit,
    Goal,
    Progress,
    Event
}