import { connect, disconnect } from 'mongoose'
import { User, Vaccine } from './models.js'


const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    Vaccine
}