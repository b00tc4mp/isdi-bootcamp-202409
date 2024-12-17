import {
    authenticateUser,
    getUser,
    getUserName,
    getProfile,
    updateProfile,
    
} from './users/index.js'

import {
    registerUserDiver,
    createHomeDiver,

} from './users/diver/index.js'

import {
    registerUserCenter,
    createHomeCenter,
    addOpeningHours

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

    createLog,
    getLogs,
    deleteLog,
    updateLog,

    
}

export default logic 