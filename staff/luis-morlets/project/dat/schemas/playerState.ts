import mongoose from 'mongoose'

const { Schema, Types: { ObjectId } } = mongoose

const playerState = new Schema({
    player: {
        type: ObjectId,
        ref: 'Player',
        required: true
    },
    quest: {
        type: ObjectId,
        ref: 'Quest',
        required: true
    },
    character: {
        type: ObjectId,
        ref: 'Character',
        required: true
    },
    level: {
        type: Number,
        required: true
    }
}, { versionKey: false })

export default playerState