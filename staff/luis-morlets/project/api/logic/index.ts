import { create } from 'domain'
import { getCharacters, getQuests, getItem, getCharacter, addCharacter } from './game/index.js'
import { registerPlayer, authenticatePlayer, getPlayerUsername, createPlayerState, deletePlayerState } from './player/index.js'

const logic = {
    authenticatePlayer,
    registerPlayer,
    getPlayerUsername,
    createPlayerState,
    deletePlayerState,

    getQuests,
    getCharacters,
    getItem,
    getCharacter,
    addCharacter
}

export default logic