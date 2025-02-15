import {
    authenticateUser,    
} from './users/index.js'

import {
    registerUserDiver,
    getProfile,
    getUserName,
    updateProfile,
    searchDiveCenters,
    getFaunaFloraByCity,

} from './users/diver/index.js'

import {
    registerUserCenter,
    updateCenterInfo,
    getUserCenter

} from './users/center/index.js'

import {
    createLog,
    getLogs,
    deleteLog,
    updateLog,
    getLog,
} from './log/index.js'

const logic = {
    authenticateUser,
    registerUserDiver,
    registerUserCenter,
    getUserName,
    getProfile,
    getUserCenter,
    updateProfile,
    updateCenterInfo,
    searchDiveCenters,
    getFaunaFloraByCity,

    createLog,
    getLogs,
    deleteLog,
    updateLog,
    getLog,
}

export default logic 