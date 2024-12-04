import mongoose from 'mongoose'

const { Schema, Types: { ObjectId } } = mongoose

import { stats, skill } from './index.js'

const character = new Schema({
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
    statistics: [stats],
    skills: [skill],
    items: [{
        type: ObjectId,
        ref: 'Item',
        required: true
    }]
}, { versionKey: false })

export default character