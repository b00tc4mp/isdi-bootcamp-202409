import {
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    getUserId
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

    //Packs
    createPack,
    getBasePacks
}

export default logic