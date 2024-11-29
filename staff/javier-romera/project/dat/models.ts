import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 12
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 16
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    role: {
        type: String,
        required: true,
        enum: ['regular', 'anonymous'],
        default: 'regular'
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    rank: {
        type: String,
        required: true,
        default: 'Rookie'
    }
}, { versionKey: false })

const arc = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: Number,
        unique: true,
        required: true
    }
})

const devilFruit = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    }
})

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

const condition = new Schema({

})

const User = model('User', user)
const Arc = model('Arc', arc)
const DevilFruit = model('DevilFruit', devilFruit)
const Character = model('Character', character)

export {
    User,
    Arc,
    DevilFruit,
    Character
}