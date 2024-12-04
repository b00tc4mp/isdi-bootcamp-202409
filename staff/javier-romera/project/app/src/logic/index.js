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
    setNewUserStatus
} from './users'

import {
    getRandomCharacter,
    getCharacterByName,
    checkOnePiecedleAnswer,
    getAllCharactersNameAndAlias
} from './characters'

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

    getRandomCharacter,
    getCharacterByName,
    checkOnePiecedleAnswer,
    getAllCharactersNameAndAlias
}

export default logic