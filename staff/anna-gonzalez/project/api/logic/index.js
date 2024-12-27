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
} from './cycles/index.js'

import {
    createReminder,
    getCurrentReminders
} from './reminders/index.js'

import {
    getTips
} from './tips/index.js'

import {
    authenticateUser,
    getUserDetails,
    registerUser
} from './users/index.js'

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
    getTips,
    authenticateUser,
    getUserDetails,
    registerUser
}

export default logic