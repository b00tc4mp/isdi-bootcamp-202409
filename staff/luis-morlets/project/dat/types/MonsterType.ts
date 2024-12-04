import { ObjectId } from 'mongoose'
import { MonsterActionType, StatsType } from './index.js'

type MonsterType = {
    name: string,
    level: number,
    type: string,
    statistics: StatsType,
    actions: MonsterActionType,
    loot: [ObjectId]
}

export default MonsterType