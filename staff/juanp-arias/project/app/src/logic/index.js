import { registerUser, loginUser, logoutUser, isUserLoggedIn, getUserName, getUserDatos, updateUserData } from './users'
import { createNote, getNotes, deleteNote, getNote, updateNote } from './notes'
import { createReminder, getReminders } from './reminders'

const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserName,
    getUserDatos,
    updateUserData,

    createNote,
    getNotes,
    deleteNote,
    getNote,
    updateNote,

    createReminder,
    getReminders
}
export default logic