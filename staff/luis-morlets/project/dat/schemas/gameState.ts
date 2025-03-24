import mongoose from 'mongoose'
import inventory from './inventory.js'

const { Schema, Types: { ObjectId } } = mongoose

const gameState = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    inventory,
    playerStates: {
        type: ObjectId,
        ref: 'playerState'
    }
}, { versionKey: false })

export default gameState