import { ObjectId } from 'mongoose'
import { SkillType, StatsType, CurrencyType } from './index.js'

type CharacterType = {
    name: string,
    class: string,
    race: string,
    stats: StatsType,
    skills: SkillType,
    items: [ObjectId],
    currency: CurrencyType
}

export default CharacterType