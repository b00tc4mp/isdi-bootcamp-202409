//USERS
import {
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,
    getUserByEmail,
    getUserByUserame,
    findUserIdbyEmailOrUsername,
    getUserDetails
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
    getActivityByPackId

} from './activity/index.js'


const logic = {
    //Customers
    registerUser,
    authenticateUser,
    getUserName,
    getCustomers,
    getUserByEmail,
    getUserByUserame,
    findUserIdbyEmailOrUsername,
    getUserDetails,

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
    getActivityByPackId

}

export default logic