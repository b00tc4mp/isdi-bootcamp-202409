import {
    registerUser,
    registerAnonymousUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    getUserUsername,
    isUserRoleAnonymous,
    isUserRoleRegular
} from './users'

import {
    getRandomCharacter,
    getCharacterByName,
    checkOnePiecedleAnswer
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

    getRandomCharacter,
    getCharacterByName,
    checkOnePiecedleAnswer
}

export default logic