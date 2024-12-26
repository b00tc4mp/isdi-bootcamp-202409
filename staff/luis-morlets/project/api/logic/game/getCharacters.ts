import { validate, errors } from 'com'
import { Player, Character } from 'dat'
import { CharacterType } from 'dat/types/index.js'
import { Characters } from '../../types.js'

const { SystemError, NotFoundError } = errors

export default (playerId: string): Promise<Characters[]> => {
    validate.id(playerId, 'playerId')

    return (async (): Promise<Characters[]> => {
        let characters, player

        try {
            const players = await Player.findById(playerId).lean()

            player = players
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
        if (!player) { throw new NotFoundError('player not found') }

        try {
            characters = await Character.find().populate({
                path: 'skills',
                populate: { path: 'skill', model: 'Skill', select: 'name description manaCost levelRequirement' },
                select: '-_id'
            }).lean<CharacterType[]>()

            const allCharacters = characters.map<Characters>((character: CharacterType): Characters => {
                return {
                    id: character._id.toString(),
                    uuid: character.uuid,
                    name: character.name,
                    class: character.class,
                    race: character.race,
                    statistics: character.statistics,
                    skills: character.skills,
                    items: character.items,
                    currency: character.currency
                }
            })
            return allCharacters
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    })()
}