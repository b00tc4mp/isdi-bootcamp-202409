import { connect, disconnect } from 'mongoose'
//import models from './models.js'
import { User, Post, Comment } from './models.js'
import './boost-mongoose.js'


const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    Post,
    Comment
}