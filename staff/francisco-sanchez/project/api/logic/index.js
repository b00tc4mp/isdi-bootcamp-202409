import {
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,
    getUserByEmail,
    getUserByUserame
} from './users/index.js'

import {
    createPack,
    assignPack,
    getBasePacks,
    getBasePackDetails
} from './packs/index.js'

import {
    sendEmail,
} from './emailing/sendEmail.js'


const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,
    getUserByEmail,
    getUserByUserame,

    createPack,
    assignPack,
    getBasePacks,
    getBasePackDetails,

    sendEmail
}

export default logic