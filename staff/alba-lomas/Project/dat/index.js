


import { connect, disconnect } from 'mongoose'
import { User, Expense } from './models.js'

const db = {
    connect,
    disconnect
}
export default db

export {
    User, 
    Expense
}