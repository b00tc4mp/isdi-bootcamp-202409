import { connect, disconnect } from 'mongoose'
import { User, Arc, DevilFruit, Character, Condition } from './models/index.js'
import { TUser, TCharacter, TArc, TCondition } from './types/index.js'

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
    Condition,

    TUser,
    TCharacter,
    TArc,
    TCondition
}