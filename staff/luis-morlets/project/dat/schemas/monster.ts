import mongoose from 'mongoose'

const { Schema, Types: { ObjectId } } = mongoose

import { stats, monsterAction } from './index.js'

const monster = new Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['undead', 'plant', 'ooze', 'monstrosity']
    },
    statistics: [stats],
    actions: [monsterAction],
    loot: [{
        type: ObjectId,
        ref: 'Item'
    }]
}, { versionKey: false })

export default monster