


import { authenticateUser, registerUser, getUserName, getUserId } from './users/index.js'
import { addExpense, getExpenses, deleteExpense, updateExpense, getSumExpenses } from './expense/index.js'

const logic = {
    authenticateUser,
    registerUser,
    getUserName,
    getUserId,

    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    getSumExpenses
}

export default logic