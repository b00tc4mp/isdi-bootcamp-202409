import { registerUser, loginUser, logoutUser, isUserLoggedIn, getUserName, getUserDatos, updateUserData, getUserRole, isUserRoleStudent, isUserRoleTeacher, getUsers } from './users'
import { createNote, getNotes, deleteNote, getNote, updateNote } from './notes'
import { createReminder, getReminders, deleteReminder, getReminder, updateReminder } from './reminders'
import { createGroup, getGroups } from './groups'

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
    getReminders,
    getReminder,
    updateReminder,
    deleteReminder,

    createGroup,
    getGroups
}
export default logic