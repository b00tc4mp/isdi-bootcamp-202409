import {
    authenticateUser,
    getUser,
    updateProfile,
    
} from './users/index.js'

import {
    registerUserDiver,
    createHomeDiver,
    getProfile,
    getUserName,
    searchCenters,

} from './users/diver/index.js'

import {
    registerUserCenter,
    createHomeCenter,
    addOpeningHours,
    updateCenterInfo

} from './users/center/index.js'

import {
    createLog,
    getLogs,
    deleteLog,
    updateLog,
} from './log/index.js'

const logic = {
    authenticateUser,
    registerUserDiver,
    registerUserCenter,
    createHomeDiver,
    createHomeCenter,
    getUser,
    getUserName,
    getProfile,
    updateProfile,
    addOpeningHours,
    searchCenters,

    createLog,
    getLogs,
    deleteLog,
    updateLog,

    updateCenterInfo

    
}

export default logic 