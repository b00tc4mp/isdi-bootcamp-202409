//USERS
import {
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,
    getUserByEmail,
    getUserByUserame,
    findUserIdbyEmailOrUsername,
    getUserDetails,
    updateUser,
    getCustomerPacks
} from './users/index.js'

//PACKS & BASEPACKS
import {
    createPack,
    assignPack,
    getBasePacks,
    getBasePackDetails,
    deleteBasePack,
    updateBasePack,
    getAdquiredPacks
} from './packs/index.js'

//EMAILING
import {
    emailRegisterWelcome,
    sendEmail,
} from './emailing/index.js'

//TRACKER
import {
    toggleTimeTracker,
} from './tracker/index.js'

//ACTIVITY
import {
    getActivityByPackId,

} from './activity/index.js'


import {
    addPayment,
} from './payments/index.js'

const logic = {
    //Users
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,
    getUserByEmail,
    getUserByUserame,
    findUserIdbyEmailOrUsername,
    getUserDetails,
    updateUser,
    getCustomerPacks,


    //Packs and basebacks
    createPack,
    assignPack,
    getBasePacks,
    getBasePackDetails,
    deleteBasePack,
    updateBasePack,
    getAdquiredPacks,

    //emailing
    emailRegisterWelcome,
    sendEmail,

    //Tracker
    toggleTimeTracker,

    //Activity
    getActivityByPackId,


    //Payments
    addPayment

}

export default logic