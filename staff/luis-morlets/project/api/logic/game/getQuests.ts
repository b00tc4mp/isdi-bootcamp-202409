import { Quests } from '../../types.js'
import { Player, Quest } from 'dat'
import { validate, errors } from 'com'
import { QuestType } from 'dat/types/index.js'

const { SystemError, NotFoundError } = errors

export default (playerId: string): Promise<Quests[]> => {
    validate.id(playerId, 'playerId')

    return (async (): Promise<Quests[]> => {
        let quests, player

        try {
            const players = await Player.findById(playerId).lean()

            player = players
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
        if (!player) { throw new NotFoundError('player not found') }

        try {
            quests = await Quest.find().lean()

            const allQuests: Quests[] = quests.map((quest: QuestType): Quests => {
                return {
                    id: quest._id.toString(),
                    name: quest.name,
                    description: quest.description,
                    isCompleted: quest.isCompleted,
                    parent: quest.parent
                }
            })
            return allQuests
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    })()
}
