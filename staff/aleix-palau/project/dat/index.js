import { connect, disconnect } from 'mongoose'
import { User, Heartbeat, Match, Notification } from './models.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    Heartbeat,
    Match,
    Notification
}