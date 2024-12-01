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
    getCharacterByName
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
    getCharacterByName
}

export default logic