import {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserName
} from './users/index.js'

import {
    getRandomCharacter
} from './characters/index.js'

const logic = {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserName,

    getRandomCharacter
}

export default logic