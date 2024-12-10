import { Character, Player } from 'dat'
import { validate, errors } from 'com'
import CharacterType from 'dat/types/CharacterType.js'
import { Characters } from '../../types.js'

const { SystemError, NotFoundError } = errors

export default (playerId: string, characterId: string): Promise<CharacterType> => {
    validate.id(playerId, 'playerId')
    validate.id(characterId, 'characterId')

    return (async (): Promise<CharacterType> => {
        let player, character

        try {
            const players = await Player.findById(playerId).lean()

            player = players
        } catch (error) { throw new SystemError((error as Error).message) }

        if (!player) { throw new NotFoundError('player not found') }

        try {
            const characters = await Character.find().lean<CharacterType>()

            character = characters

            if (!character) throw new NotFoundError('character not found')

            return character

        } catch (error) { throw new SystemError((error as Error).message) }
    })()
}