import { getCharacters, getQuests, getItem, getCharacter } from './game/index.js'
import { registerPlayer, authenticatePlayer, getPlayerUsername } from './player/index.js'

const logic = {
    authenticatePlayer,
    registerPlayer,
    getPlayerUsername,

    getQuests,
    getCharacters,
    getItem,
    getCharacter
}

export default logic