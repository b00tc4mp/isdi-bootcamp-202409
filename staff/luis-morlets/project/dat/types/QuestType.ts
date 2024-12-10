import mongoose from 'mongoose'

type QuestType = {
    _id: mongoose.Types.ObjectId
    name: string,
    description: string,
    isCompleted: boolean,
    parent: mongoose.Types.ObjectId
}

export default QuestType