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
    getTips
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
    getTips
}

export default logic