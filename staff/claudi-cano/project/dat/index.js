import { connect, disconnect } from 'mongoose'
import { User, Product, Comment } from './models.js'
import './boost-mongoose.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    Product,
    Comment
}