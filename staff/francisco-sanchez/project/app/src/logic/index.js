import {
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser
} from './users'

import {
    createPack
} from './packs'


const logic = {
    //Users
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,

    //Packs
    createPack
}

export default logic