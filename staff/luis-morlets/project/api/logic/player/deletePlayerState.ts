import { Player, PlayerState } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (playerId: string, playerStateId: string): Promise<void> => {
    validate.id(playerId, 'playerId')
    validate.id(playerStateId, 'playerStateId')

    return (async (): Promise<void> => {
        let player, playerState

        try {
            player = await Player.findById(playerId).lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!player) { throw new NotFoundError('player not found') }

        try {
            playerState = await PlayerState.findById(playerStateId).lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!playerState) { throw new NotFoundError('player state not found') }
        if (playerState.player.toString() !== playerId) { throw new OwnershipError('this state does not belong to player') }

        try {
            await PlayerState.deleteOne({ _id: playerStateId })
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    })()
}