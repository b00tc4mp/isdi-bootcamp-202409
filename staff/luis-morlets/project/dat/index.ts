import { connect, disconnect } from 'mongoose'
import { Player, Settings, Skill, Stats, GameState, Quest, Item, Monster, MonsterAction, PlayerState, Character } from './models/index.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    Player,
    Settings,
    Skill,
    Stats,
    GameState,
    Quest,
    Item,
    Monster,
    MonsterAction,
    PlayerState,
    Character
}