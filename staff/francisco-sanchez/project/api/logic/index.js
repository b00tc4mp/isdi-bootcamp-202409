import {
    registerUser,
    authenticateUser
} from './users/index.js'

import {
    createPack,
    assignPack,
} from './packs/index.js'


const logic = {
    registerUser,
    authenticateUser,

    createPack,
    assignPack
}

export default logic