import {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserUsername
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

    getRandomCharacter,
    getCharacterByName,
    getAllCharactersNameAndAlias
}

export default logic