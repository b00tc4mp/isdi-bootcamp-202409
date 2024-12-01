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
    getRandomCharacter
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

    getRandomCharacter
}

export default logic