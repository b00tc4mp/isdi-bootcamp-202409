import {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserUsername,
    setNewUserStatus,
    getUserStatus,
    deleteAllAnonymousUsers,
    getUserScore,
    updateUserScore,
    getRankingScores
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
    deleteAllAnonymousUsers,
    getUserScore,
    updateUserScore,
    getRankingScores,

    getRandomCharacter,
    getCharacterByName,
    getAllCharacters,
    getAllCharactersNameAndAlias,
    getCharactersByArc,

    getRandomConditions
}

export default logic