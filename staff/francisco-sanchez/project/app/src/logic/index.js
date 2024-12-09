import {
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    getUserId,
    getUserName
} from './users'

import {
    createPack,
    getBasePacks
} from './packs'


const logic = {
    //Users
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    getUserId,
    getUserName,

    //Packs
    createPack,
    getBasePacks
}

export default logic