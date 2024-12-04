import mongoose from 'mongoose'

const { Schema } = mongoose

const stats = new Schema({
    armorClass: {
        type: Number,
        required: true
    },
    hitPoints: {
        type: Number,
        required: true
    },
    strength: {
        type: Number,
        required: true
    },
    dexterity: {
        type: Number,
        required: true
    },
    constitution: {
        type: Number,
        required: true
    },
    intelligence: {
        type: Number,
        required: true
    },
    wisdom: {
        type: Number,
        required: true
    },
    charisma: {
        type: Number,
        required: true
    }
}, { versionKey: false })

export default stats