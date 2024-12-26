import { Player, PlayerState } from 'dat'
import { validate, errors } from 'com'
import PlayerStateType from 'dat/types/PlayerStateType.js'

const { SystemError, NotFoundError } = errors

export default (playerId: string): Promise<PlayerStateType> => {
    validate.id(playerId, 'playerId')

    return (async (): Promise<PlayerStateType> => {
        let player, playerState

        try {
            player = await Player.findById(playerId).lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!player) { throw new NotFoundError('player not found') }

        try {
            playerState = await PlayerState.findOne({ player: playerId }).populate('player', 'quest').lean<PlayerStateType>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!playerState) { throw new NotFoundError('player state not found') }

        return playerState
    })()
}