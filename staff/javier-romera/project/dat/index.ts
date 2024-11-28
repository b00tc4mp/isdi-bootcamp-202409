import { connect, disconnect } from 'mongoose'
import { User } from './models.js'

const db = {
    connect,
    disconnect
}

export default db