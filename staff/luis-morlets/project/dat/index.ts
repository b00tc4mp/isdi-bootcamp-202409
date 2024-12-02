import { connect, disconnect } from 'mongoose'
import { Player } from './models.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    Player
}