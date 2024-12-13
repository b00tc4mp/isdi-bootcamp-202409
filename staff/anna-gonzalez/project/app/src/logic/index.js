import {
    addPeriodEnd,
    createCycle,
    createDayLog,
    deleteCycle,
    getCyclesDetails,
    getCyclesStart,
    getCurrentCycleStart,
    getCurrentDayLog,
    getPeriodDays
} from './cycles'

import {
    createReminder,
    getCurrentReminders
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
    deleteCycle,
    getCyclesDetails,
    getCyclesStart,
    getCurrentCycleStart,
    getCurrentDayLog,
    getPeriodDays,
    createReminder,
    getCurrentReminders,
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