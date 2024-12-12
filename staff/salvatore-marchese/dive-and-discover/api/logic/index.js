import {
    authenticateUser,
    registerUserDiver,
    registerUserCenter,
    homeDiver,
    homeCenter,
    getUser,
    getUserName,
    getProfile,
    updateProfile,
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
    homeDiver,
    homeCenter,
    getUser,
    getUserName,
    getProfile,
    updateProfile,

    createLog,
    getLogs,
    deleteLog,
    updateLog,
}

export default logic 