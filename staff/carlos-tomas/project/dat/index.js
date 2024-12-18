import { connect, disconnect } from 'mongoose'
import { User, Vaccine, Deworn, Pet, History, Appointment } from './models.js'


const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    Vaccine,
    Deworn,
    Pet,
    History,
    Appointment
}