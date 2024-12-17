import { registerPlayer, loginPlayer, logoutPlayer, isPlayerLoggedIn, getPlayerId, getPlayerUsername, getPlayerState, createPlayerState, deletePlayerState } from './players'
import { getCharacterByUuid, getItems, getCharacters, createParty, getCharacterById } from './game'

const logic = {
    registerPlayer,
    loginPlayer,
    isPlayerLoggedIn,
    logoutPlayer,
    getPlayerId,
    getPlayerUsername,
    getPlayerState,
    createPlayerState,
    deletePlayerState,

    getCharacterByUuid,
    getItems,
    getCharacters,
    createParty,
    getCharacterById,
}

export default logic