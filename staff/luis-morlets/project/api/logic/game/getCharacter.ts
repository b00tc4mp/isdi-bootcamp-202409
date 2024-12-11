import { Character, Player } from 'dat'
import { validate, errors } from 'com'
import CharacterType from 'dat/types/CharacterType.js'

const { SystemError, NotFoundError } = errors

export default (playerId: string, characterId: string): Promise<CharacterType> => {
    validate.id(playerId, 'playerId')
    validate.uuid(characterId, 'characterId')

    return (async (): Promise<CharacterType> => {
        let player, character

        try {
            player = await Player.findById(playerId).lean()

        } catch (error) { throw new SystemError((error as Error).message) }

        if (!player) { throw new NotFoundError('player not found') }

        try {
            character = await Character.findOne({ uuid: characterId }).populate('items').lean<CharacterType>()

            if (!character) throw new NotFoundError('character not found')

            return character

        } catch (error) { throw new SystemError((error as Error).message) }
    })()
}