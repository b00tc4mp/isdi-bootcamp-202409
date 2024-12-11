import { ObjectId } from 'mongoose'
import { SkillType, StatsType, CurrencyType } from './index.js'

type CharacterType = {
    _id: ObjectId | string,
    uuid: string,
    name: string,
    class: string,
    race: string,
    statistics: StatsType,
    skills: SkillType,
    items: [ObjectId],
    currency: CurrencyType
}

export default CharacterType