import { connect, disconnect } from 'mongoose'
import { User } from './models.js'
import './mongoose-plus.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    User
}