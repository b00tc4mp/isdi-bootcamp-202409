import { connect, disconnect } from 'mongoose'
import { User, Arc, DevilFruit, Character, Condition } from './models/index.js'

const db = {
    connect,
    disconnect,
}

export default db

export {
    User,
    Arc,
    DevilFruit,
    Character,
    Condition
}