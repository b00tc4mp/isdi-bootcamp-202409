import {
    addPeriodEnd,
    createCycle,
    createDayLog,
    getCyclesStart,
    getCurrentCycleStart,
    getCurrentDayLog,
    getPeriodDays
} from './cycles'

import {
    createReminder
} from './reminders'

import {
    getUserName,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser
} from './users'

import {
    getExerciseTips,
    getMusicTips,
    getNutritionTips,
    getSelfCareTips
} from './tips'

const logic = {
    addPeriodEnd,
    createCycle,
    createDayLog,
    getCyclesStart,
    getCurrentCycleStart,
    getCurrentDayLog,
    getPeriodDays,
    createReminder,
    getUserName,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    getExerciseTips,
    getMusicTips,
    getNutritionTips,
    getSelfCareTips
}

export default logic