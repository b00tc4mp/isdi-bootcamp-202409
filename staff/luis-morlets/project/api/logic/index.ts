import { getCharacters, getQuests, getItem, getCharacter, addCharacter, removeCharacter, getCharacterByUuid } from './game/index.js'
import { registerPlayer, authenticatePlayer, getPlayerUsername, createPlayerState, deletePlayerState, getPlayerState } from './player/index.js'

const logic = {
    authenticatePlayer,
    registerPlayer,
    getPlayerUsername,
    createPlayerState,
    deletePlayerState,
    getPlayerState,

    getQuests,
    getCharacters,
    getItem,
    getCharacter,
    addCharacter,
    removeCharacter,
    getCharacterByUuid
}

export default logic