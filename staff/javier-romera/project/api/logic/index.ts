import {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserUsername,
    setNewUserStatus
} from './users/index.js'

import {
    getRandomCharacter,
    getCharacterByName,
    getAllCharactersNameAndAlias
} from './characters/index.js'

const logic = {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserUsername,
    setNewUserStatus,

    getRandomCharacter,
    getCharacterByName,
    getAllCharactersNameAndAlias
}

export default logic