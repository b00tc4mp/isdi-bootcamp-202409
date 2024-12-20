import { connect, disconnect } from 'mongoose'
import { User, Group, Note, Reminder, Task } from './models.js'

const db = {
    connect,
    disconnect
}
export default db

export {
    User,
    Group,
    Note,
    Reminder,
    Task
}