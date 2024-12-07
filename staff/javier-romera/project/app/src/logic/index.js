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
    deleteAnonymousUser
} from './users'

import {
    getRandomCharacter,
    getCharacterByName,
    checkOnePiecedleAnswer,
    getAllCharacters,
    getAllCharactersNameAndAlias
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
    deleteAnonymousUser,

    getRandomCharacter,
    getCharacterByName,
    checkOnePiecedleAnswer,
    getAllCharacters,
    getAllCharactersNameAndAlias,

    getRandomConditions
}

export default logic