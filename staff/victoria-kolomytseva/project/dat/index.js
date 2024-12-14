import { connect, disconnect } from 'mongoose'
import { User, Post, Comment, Report } from './models.js'
import './boost-mongoose.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    Post,
    Comment,
    Report
}