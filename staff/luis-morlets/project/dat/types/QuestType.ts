import { ObjectId } from 'mongoose'

type QuestType = {
    name: string,
    description: string,
    parent: ObjectId
}

export default QuestType