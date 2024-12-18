import {
    authenticateUser,
    registerUser,
    registerAnonymousUser,
    getUserUsername,
    setNewUserStatus,
    getUserStatus,
    deleteAllAnonymousUsers,
    getUserDetails,
    updateUserScore,
    getRankingScores,
    updateUserProfile
} from './users/index.js'

import {
    getRandomCharacter,
    getCharacterByName,
    getAllCharacters,
    getAllCharactersNameAndAlias,
    getCharactersByArc
} from './characters/index.js'

import {
    getAllConditions,
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
    getUserDetails,
    updateUserScore,
    getRankingScores,
    updateUserProfile,

    getRandomCharacter,
    getCharacterByName,
    getAllCharacters,
    getAllCharactersNameAndAlias,
    getCharactersByArc,

    getAllConditions,
    getRandomConditions
}

export default logic