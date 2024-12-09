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


const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,

    createPack,
    assignPack,
    getBasePacks
}

export default logic