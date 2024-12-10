import addHabit from './habits/addHabit.js';
import getHabits from './habits/getHabits.js';
import trackHabitProgress from './habits/trackHabitProgress.js'
import updateHabit from './habits/updateHabit.js'
import deleteHabit from './habits/deleteHabit.js'

import getUserName from './users/getUserName.js';
import registerUser from './users/registerUser.js'
import authenticateUser from './users/authenticateUser.js';


export default {
    addHabit,
    getHabits,
    deleteHabit,
    trackHabitProgress,
    updateHabit,
    
    registerUser,
    getUserName,
    authenticateUser,
};
