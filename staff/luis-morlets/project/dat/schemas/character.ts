import mongoose from 'mongoose'

import { stats, skill, currency } from './index.js'

const { Schema, Types: { ObjectId } } = mongoose

const character = new Schema({
    uuid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    statistics: stats,
    skills: [skill],
    currency: currency,
    items: [{
        type: ObjectId,
        ref: 'Item',
        required: true
    }]
}, { versionKey: false })

export default character