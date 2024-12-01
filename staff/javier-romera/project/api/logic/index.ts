import {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserName
} from './users/index.js'

import {
    getRandomCharacter,
    getCharacterByName
} from './characters/index.js'

const logic = {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserName,

    getRandomCharacter,
    getCharacterByName
}

export default logic