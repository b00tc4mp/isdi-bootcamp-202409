import {
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    getUserId,
    getUserName,
    getCustomers,
    getUserDetails,
    updateUser,
    getCustomerPacks
} from './users'

import {
    createPack,
    getBasePacks,
    getBasePacksDetails,
    assignPack,
    deleteBasePack,
    updateBasePack,
    getAdquiredPacks,
} from './packs'

import {
    getActivitiesByPackId,
} from './activities'


import {
    toggleTimeTracker
} from './tracker'

import { get } from 'mongoose'
import { getDecimalToTimeFormat } from './helpers'


const logic = {
    //Users
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    getUserId,
    getUserName,
    getCustomers,
    getUserDetails,
    updateUser,
    getCustomerPacks,

    //Packs
    createPack,
    getBasePacks,
    getBasePacksDetails,
    assignPack,
    deleteBasePack,
    updateBasePack,
    getAdquiredPacks,

    //Activities
    getActivitiesByPackId,

    //Helpers
    getDecimalToTimeFormat,

    //Tracker
    toggleTimeTracker
}




export default logic