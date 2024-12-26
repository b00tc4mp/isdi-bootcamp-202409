import mongoose, { ObjectId } from 'mongoose'
import { Request } from 'express'
import { StatsType, SkillType, CurrencyType } from 'dat/types/index.js'

interface IRequest extends Request {
    playerId: string,
    itemId: string
}

type Quests = {
    id: string | undefined,
    name: string,
    description: string,
    isCompleted: boolean,
    parent: mongoose.Types.ObjectId
}

type Characters = {
    uuid: string,
    id: string,
    name: string,
    class: string,
    race: string,
    statistics: StatsType,
    skills: SkillType,
    items: [ObjectId],
    currency: CurrencyType
}

export {
    IRequest,
    Quests,
    Characters
}