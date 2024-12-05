import mongoose from 'mongoose'
import playerState from './playerState.js'

const { Schema, Types: { ObjectId } } = mongoose

const gameState = new Schema({
    host: {
        type: ObjectId,
        ref: 'Player',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['playing', 'idle', 'offline'],
        default: 'offline'
    },
    createdAt: {
        type: Date,
        required: true
    },
    inventory: [{
        type: ObjectId,
        ref: 'Item'
    }, {
        type: ObjectId,
        ref: 'Currency'
    }],
    playerStates: [playerState],
    characters: [{
        type: ObjectId,
        ref: 'Characters'
    }]
}, { versionKey: false })

export default gameState