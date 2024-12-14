import {
    registerUser,
    registerAnonymousUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    getUserUsername,
    isUserRoleAnonymous,
    isUserRoleRegular,
    getUserStatus,
    setNewUserStatus,
    getUserScore,
    updateUserScore,
    getRankingScores
} from './users'

import {
    getRandomCharacter,
    getCharacterByName,
    getAllCharacters,
    getAllCharactersNameAndAlias,
    getCharactersByArc
} from './characters'

import {
    getRandomConditions
} from './conditions'

const logic = {
    registerUser,
    registerAnonymousUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    getUserUsername,
    isUserRoleAnonymous,
    isUserRoleRegular,
    getUserStatus,
    setNewUserStatus,
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