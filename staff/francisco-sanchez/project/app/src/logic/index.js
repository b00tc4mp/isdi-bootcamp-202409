import {
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    getUserId,
    getUserName,
    getCustomers,
    findUserIdbyEmailOrUsername,
} from './users'

import {
    createPack,
    getBasePacks,
    getBasePacksDetails,
    assingPack,
} from './packs'


const logic = {
    //Users
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    getUserId,
    getUserName,
    getCustomers,
    findUserIdbyEmailOrUsername,


    //Packs
    createPack,
    getBasePacks,
    getBasePacksDetails,
    assingPack
}

export default logic