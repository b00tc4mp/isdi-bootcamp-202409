import {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserUsername,
    setNewUserStatus,
    getUserStatus,
    deleteAnonymousUser,
    deleteAllAnonymousUsers,
    getUserScore,
    updateUserScore
} from './users/index.js'

import {
    getRandomCharacter,
    getCharacterByName,
    getAllCharacters,
    getAllCharactersNameAndAlias,
    getCharactersByArc
} from './characters/index.js'

import {
    getRandomConditions
} from './conditions/index.js'

const logic = {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserUsername,
    setNewUserStatus,
    getUserStatus,
    deleteAnonymousUser,
    deleteAllAnonymousUsers,
    getUserScore,
    updateUserScore,

    getRandomCharacter,
    getCharacterByName,
    getAllCharacters,
    getAllCharactersNameAndAlias,
    getCharactersByArc,

    getRandomConditions
}

export default logic