import { registerPlayer, loginPlayer, logoutPlayer, isPlayerLoggedIn, getPlayerId, getPlayerUsername } from './players'
import { getCharacter, getItems, getCharacters } from './game'

const logic = {
    registerPlayer,
    loginPlayer,
    isPlayerLoggedIn,
    logoutPlayer,
    getPlayerId,
    getPlayerUsername,

    getCharacter,
    getItems,
    getCharacters
}

export default logic