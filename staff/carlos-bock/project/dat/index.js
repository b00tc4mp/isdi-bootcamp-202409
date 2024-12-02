import { connect, disconnect } from 'mongoose'
import { User, Recommend, Comment, Country, City, Destination } from './models.js'
import './mongoose-plus.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    Recommend,
    Comment,
    Country,
    City,
    Destination
}