import { model, Schema, Types } from 'mongoose'
const { ObjectId } = Types

const character = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    devilFruit: {
        type: ObjectId
    },
    bounty: {
        type: BigInt,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    firstArc: {
        type: ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    armament: {
        type: Boolean,
        required: true
    },
    conqueror: {
        type: Boolean,
        required: true
    },
    observation: {
        type: Boolean,
        required: true
    },
    sea: {
        type: String,
        required: true
    },
    town: {
        type: String || null,
        required: true
    }
})

const Character = model('Character', character, 'characters')

export default Character