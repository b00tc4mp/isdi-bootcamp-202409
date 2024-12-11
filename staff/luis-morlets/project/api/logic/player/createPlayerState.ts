import { MongoError } from 'mongodb'
import { Player, PlayerState, Quest } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, DuplicityError } = errors

export default (playerId: string): Promise<void> => {
    validate.id(playerId, 'playerId')

    return (async (): Promise<void> => {
        let player, questName

        try {
            player = await Player.findById(playerId).lean()
        } catch (error) { throw new SystemError((error as Error).message) }

        if (!player) { throw new NotFoundError('player not found') }

        try {
            questName = await Quest.findOne({ name: 'The Cursed Kingdom' }).lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!questName) { throw new NotFoundError('quest not found') }

        try {
            await PlayerState.create({
                player: playerId,
                quest: questName
            })
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    })()
}