import {
    registerUser,
    authenticateUser,
    getUserName
} from './users/index.js'


import {
    addHabit,
    deleteHabit,
    getHabits,
    trackHabitProgress,
    updateHabit
} from './habits/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    addHabit,
    deleteHabit,
    getHabits,
    trackHabitProgress,
    updateHabit
}

export default logic 

