import { Player } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (playerId: string, targetPlayerId: string): Promise<string | undefined> => {
    validate.id(playerId, 'userId')
    validate.id(targetPlayerId, 'targetUserId')

    return (async () => {
        try {
            const [player, targetPlayer] = await Promise.all([Player.findById(playerId).lean(), Player.findById(targetPlayerId).lean()])

            if (!player) throw new NotFoundError('player not found')
            if (!targetPlayer) throw new NotFoundError('target player not found')

            return targetPlayer.username
        } catch (error) {
            if (error instanceof SystemError) throw new SystemError((error as Error).message)
        }
    })()
}