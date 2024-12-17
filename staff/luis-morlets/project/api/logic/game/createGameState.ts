import { Player, PlayerState, GameState, Inventory } from 'dat'
import { validate, errors } from 'com'
import PlayerStateType from 'dat/types/PlayerStateType.js'
import { ObjectId } from 'mongoose'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (playerId: string, playerStateId: string): Promise<void> => {
    validate.id(playerId, 'playerId')
    validate.id(playerStateId, 'playerStateId')

    return (async (): Promise<void> => {
        let player, playerState, gameState

        try {
            player = await Player.findById(playerId).lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!player) { throw new NotFoundError('player not found') }

        try {
            playerState = await PlayerState.findById(playerStateId).populate('characters', 'items').lean<PlayerStateType>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!playerState) { throw new NotFoundError('player state not found') }
        if (playerState.player.toString() !== playerId) { throw new OwnershipError('this state does not belong to player') }

        const { characters } = playerState

        let charItems: ObjectId[] = []

        characters.forEach(character => {
            charItems.push(...character.items)
        })

        try {
            gameState = await GameState.create({
                playerStates: playerStateId,
                inventory: new Inventory({
                    items: charItems,
                    currency: 200
                })
            })
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    })()
}