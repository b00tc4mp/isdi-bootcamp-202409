import { Player, PlayerState, Quest } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (playerId: string): Promise<void> => {
    validate.id(playerId, 'playerId')

    return (async (): Promise<void> => {
        let player, questName, playerState

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
            playerState = await PlayerState.findOne({ player: playerId }).lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (playerState) {
            try {
                await PlayerState.updateOne({
                    player: playerId
                }, {
                    player: playerId,
                    quest: questName,
                    characters: []
                }, {
                    upsert: true
                })
            } catch (error) {
                throw new SystemError((error as Error).message)
            }
        } else {
            try {
                await PlayerState.create({
                    player: playerId,
                    quest: questName
                })
            } catch (error) {
                throw new SystemError((error as Error).message)
            }
        }
    })()
}