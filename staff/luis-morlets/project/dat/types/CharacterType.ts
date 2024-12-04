import { ObjectId } from 'mongoose'
import { ItemType, SkillType, StatsType } from './index.js'

type CharacterType = {
    name: string,
    class: string,
    race: string,
    stats: StatsType,
    skills: SkillType,
    items: [ObjectId]
}

export default CharacterType