import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const settings = new Schema({
    music: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    brightness: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
    },
    language: {
        type: String,
        enum: ['español', 'english'],
        default: 'english'
    },
    saveProgress: {
        type: String,
        required: true
    }
}, { versionKey: false })

const player = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
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
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    gamesState: {
        type: ObjectId,
        ref: 'GameState'
    },
    settings: [settings]
}, { versionKey: false })

const quest = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    parent: {
        type: ObjectId,
        ref: 'Quest',
        required: true
    }
}, { versionKey: false })

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

const gameState = new Schema({
    host: {
        type: ObjectId,
        ref: 'Player',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['playing', 'idle', 'offline'],
        default: 'offline'
    },
    createdAt: {
        type: Date,
        required: true
    },
    inventory: [{
        type: ObjectId,
        ref: 'Item'
    }],
    playerStates: [playerState],
    characters: [{
        type: ObjectId,
        ref: 'Characters'
    }]
}, { versionKey: false })

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

const skill = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    levelRequirement: {
        type: Number,
        required: true
    }
}, { versionKey: false })

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
    hitDie: {
        type: Number,
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

const item = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        enum: ['buy', 'sell']
    },
    source: {
        type: String,
        required: true,
        enum: ['buyable', 'looted']
    },
    type: {
        type: String,
        required: true,
        enum: ['utility', 'damage', 'consumable', 'currency']
    },
    effect: {
        type: String,
        required: true
    }
}, { versionKey: false })

const monsterAction = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['melee', 'ranged']
    }
}, { versionKey: false })

const monster = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['undead', 'plant', 'ooze', 'monstrosity', 'dragon', 'aberration']
    },
    hitDice: {
        type: Number,
        required: true
    },
    statistics: [stats],
    actions: [monsterAction],
    loot: [{
        type: ObjectId,
        ref: 'Item'
    }]
}, { versionKey: false })


const Player = model('Player', player)
const Settings = model('Settings', settings)
const Quest = model('Quest', quest)
const PlayerState = model('PlayerState', playerState)
const GameState = model('GameState', gameState)
const Character = model('Character', character)
const Stats = model('Stats', stats)
const Skill = model('Skill', skill)
const Item = model('Item', item)
const Monster = model('Monster', monster)
const MonsterAction = model('MonsterAction', monsterAction)

export {
    Player,
    Settings,
    Quest,
    PlayerState,
    GameState,
    Character,
    Stats,
    Skill,
    Item,
    Monster,
    MonsterAction
}