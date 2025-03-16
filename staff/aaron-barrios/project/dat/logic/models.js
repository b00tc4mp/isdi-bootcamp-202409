import mongoose from 'mongoose'

const { Schema, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 25
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    role: {
        type: String,
        required: true,
        enum: ['regular', 'anonym'],
        default: 'regular'
    },
    avatar: {
        type: String
    }
}, { versionKey: false })

const pokemonTypes = {
    1: 'Normal',
    2: 'Fight',
    3: 'flying',
    4: 'poison',
    5: 'ground',
    6: 'rock',
    7: 'bug',
    8: 'ghost',
    9: 'steel',
    10: 'fire',
    11: 'water',
    12: 'grass',
    13: 'Electric',
    14: 'Psychic',
    15: 'Ice',
    16: 'Dragon',
    17: 'Dark',
    18: 'Fairy'
}

const move = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    damage: {
        type: Number,
        required: true
    },
    uses: {
        type: Number,
        required: true
    }
})



const pokemon = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    },
    genre: {
        type: String,
        required: true,
        enum: ['male', 'female', 'null']
    },
    life: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    moves: [move],
    backImageSprite: {
        type: String,
        required: true
    },
    frontImageSprite: {
        type: String,
        required: true
    },
}, { versionKey: false })


const User = model('User', user)
const Move = model('Move', move)
const Pokemon = model('Pokemon', pokemon)

export {
    User,
    Move,
    Pokemon
}