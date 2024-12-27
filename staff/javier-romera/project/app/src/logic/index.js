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
    getUserDetails,
    updateUserScore,
    getRankingScores,
    updateUserProfile
} from './users'

import {
    getRandomCharacter,
    getCharacterByName,
    getAllCharacters,
    getAllCharactersNameAndAlias,
    getCharactersByArc
} from './characters'

import {
    getRandomConditions,
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
    getUserDetails,
    updateUserScore,
    getRankingScores,
    updateUserProfile,

    getRandomCharacter,
    getCharacterByName,
    getAllCharacters,
    getAllCharactersNameAndAlias,
    getCharactersByArc,

    getRandomConditions,
}

export default logic