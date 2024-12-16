import {
    authenticateUser,
    registerUserDiver,
    registerUserCenter,
    createHomeDiver,
    createHomeCenter,
    getUser,
    getUserName,
    getProfile,
    updateProfile,
    addOpeningHours
} from './users/index.js'

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