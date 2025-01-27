


import {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    isUserRoleRestaurant,
    isUserRoleEmployee,
    getUserId,
    logoutUser
} from './users'

import { addExpense, getExpenses, updateExpense, deleteExpense, getSumExpenses } from './expense'
import { addProvider, getProvider, deleteProvider } from './provider'

const logic = {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    isUserRoleRestaurant,
    isUserRoleEmployee,
    getUserId,
    logoutUser,

    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getSumExpenses,

    addProvider,
    getProvider,
    deleteProvider
}
export default logic