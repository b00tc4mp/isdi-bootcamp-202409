import {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserUsername,
    setNewUserStatus,
    getUserStatus,
    deleteAnonymousUser
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
    getUserStatus,
    deleteAnonymousUser,

    getRandomCharacter,
    getCharacterByName,
    getAllCharactersNameAndAlias
}

export default logic