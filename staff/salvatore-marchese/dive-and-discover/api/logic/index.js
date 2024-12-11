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
    getLogs
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
}

export default logic 