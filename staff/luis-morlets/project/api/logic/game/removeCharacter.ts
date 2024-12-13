import { Player, PlayerState } from 'dat'
import { validate, errors } from 'com'
import PlayerStateType from 'dat/types/PlayerStateType.js'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (playerId: string, playerStateId: string, characterId: string): Promise<void> => {
    validate.id(playerId, 'playerId')
    validate.id(playerStateId, 'playerStateId')
    validate.id(characterId, 'characterId')

    return (async (): Promise<void> => {
        let player, playerState
        try {
            player = await Player.findById(playerId).lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!player) { throw new NotFoundError('player not found') }

        try {
            playerState = await PlayerState.findById(playerStateId).lean<PlayerStateType>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!playerState) { throw new NotFoundError('player state not found') }
        if (playerState.player.toString() !== playerId) { throw new OwnershipError('this state does not belong to player') }

        try {
            await PlayerState.findByIdAndUpdate(
                playerStateId,
                { $pull: { characters: characterId } }
            )
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    })()
}