import { registerUser, loginUser, logoutUser, isUserLoggedIn, getUserName, getUserDatos, updateUserData, getUserRole, isUserRoleStudent, isUserRoleTeacher, getUsers } from './users'
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
    getUsers,

    getUserRole,
    isUserRoleStudent,
    isUserRoleTeacher,

    createNote,
    getNotes,
    deleteNote,
    getNote,
    updateNote,

    createReminder,
    getReminders
}
export default logic