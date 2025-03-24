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
    characters: [{
        type: ObjectId,
        ref: 'Character',
        required: true,
        default: []
    }],
    level: {
        type: Number,
        required: true,
        default: 1
    }
}, { versionKey: false })

export default playerState