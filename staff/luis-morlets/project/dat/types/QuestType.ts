import { ObjectId } from 'mongoose'

type QuestType = {
    name: string,
    description: string,
    isCompleted: Boolean
    parent: ObjectId
}

export default QuestType