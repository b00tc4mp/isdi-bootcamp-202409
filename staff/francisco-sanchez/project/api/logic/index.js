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
    getBasePackDetails
} from './packs/index.js'

import {
    emailRegisterWelcome,
    sendEmail
} from './emailing/index.js'


const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,
    getUserByEmail,
    getUserByUserame,
    findUserIdbyEmailOrUsername,

    createPack,
    assignPack,
    getBasePacks,
    getBasePackDetails,

    emailRegisterWelcome,
    sendEmail

}

export default logic