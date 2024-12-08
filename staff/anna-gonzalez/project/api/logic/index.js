import {
    addPeriodEnd,
    createCycle,
    getCyclesStart,
    getCurrentCycleStart,
    getPeriodDays
} from './cycles/index.js'

import {
    getExerciseTips,
    getMusicTips,
    getNutritionTips,
    getSelfCareTips
} from './tips/index.js'

import {
    authenticateUser,
    getUserDetails,
    registerUser
} from './users/index.js'

const logic = {
    addPeriodEnd,
    createCycle,
    getCyclesStart,
    getCurrentCycleStart,
    getPeriodDays,
    getExerciseTips,
    getMusicTips,
    getNutritionTips,
    getSelfCareTips,
    authenticateUser,
    getUserDetails,
    registerUser
}

export default logic