import {
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,
} from './users/index.js'

import {
    createPack,
    assignPack,
    getBasePacks
} from './packs/index.js'

import {
    sendEmail,
} from './emailing/sendEmail.js'


const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,

    createPack,
    assignPack,
    getBasePacks,

    sendEmail
}

export default logic