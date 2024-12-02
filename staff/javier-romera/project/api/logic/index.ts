import {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserUsername
} from './users/index.js'

import {
    getRandomCharacter,
    getCharacterByName
} from './characters/index.js'

const logic = {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserUsername,

    getRandomCharacter,
    getCharacterByName
}

export default logic