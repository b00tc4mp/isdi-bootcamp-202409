import {
    registerUser,
    registerAnonymousUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    getUserName,
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
    getUserName,
    isUserRoleAnonymous,
    isUserRoleRegular,

    getRandomCharacter,
    getCharacterByName,
    checkOnePiecedleAnswer
}

export default logic