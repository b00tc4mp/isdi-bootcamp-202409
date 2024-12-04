import { Player } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (playerId: string, targetPlayerId: string): Promise<string | undefined> => {
    validate.id(playerId, 'userId')
    validate.id(targetPlayerId, 'targetUserId')

    return (async () => {
        let player, targetPlayer

        try {
            const players = await Promise.all([Player.findById(playerId).lean(), Player.findById(targetPlayerId).lean()])

            player = players[0]
            targetPlayer = players[1]
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!player) { throw new NotFoundError('player not found') }
        if (!targetPlayer) { throw new NotFoundError('target player not found') }

        return targetPlayer.username
    })()
}