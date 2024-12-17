import { Player, Character, PlayerState } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (playerId: string, playerStateId: string, characterId: string): Promise<void> => {
    validate.id(playerId, 'playerId')
    validate.id(playerStateId, 'playerStateId')
    validate.id(characterId, 'characterId')

    return (async () => {
        let player, playerState, character

        try {
            player = await Player.findById(playerId).lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!player) throw new NotFoundError('player not found')

        try {
            playerState = await PlayerState.findById(playerStateId).lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!playerState) throw new NotFoundError('player state not found')
        if (playerState.player.toString() !== playerId) { throw new OwnershipError('this state does not belong to player') }

        try {
            character = Character.findById(characterId).lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!character) { throw new NotFoundError('character not found') }

        try {
            await PlayerState.findByIdAndUpdate(
                playerStateId,
                { $addToSet: { characters: characterId } },
                { new: true }
            )
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    })()
}