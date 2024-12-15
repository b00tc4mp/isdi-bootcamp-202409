import {
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,
    getUserByEmail,
    getUserByUserame,
    findUserIdbyEmailOrUsername
} from './users/index.js'

import {
    createPack,
    assignPack,
    getBasePacks,
    getBasePackDetails,
    deleteBasePack
} from './packs/index.js'

import {
    emailRegisterWelcome,
    sendEmail
} from './emailing/index.js'


const logic = {
    //Customers
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,
    getUserByEmail,
    getUserByUserame,
    findUserIdbyEmailOrUsername,

    //Packs and basebacks
    createPack,
    assignPack,
    getBasePacks,
    getBasePackDetails,
    deleteBasePack,

    //emailing
    emailRegisterWelcome,
    sendEmail

}

export default logic