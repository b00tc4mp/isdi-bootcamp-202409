import { registerPlayer, loginPlayer, logoutPlayer, isPlayerLoggedIn, getPlayerId, getPlayerUsername } from './players'
import { getCharacter, getItems } from './game'

const logic = {
    registerPlayer,
    loginPlayer,
    isPlayerLoggedIn,
    logoutPlayer,
    getPlayerId,
    getPlayerUsername,

    getCharacter,
    getItems
}

export default logic