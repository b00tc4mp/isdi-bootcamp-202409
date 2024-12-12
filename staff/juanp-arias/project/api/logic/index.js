import { registerUser, authenticateUser, getUserName, getUserDatos, updateUserData, getUsers } from './users/index.js'
import { createNote, getNotes, deleteNote, getNote, updateNote } from './notes/index.js'
import { createReminder, getReminders, deleteReminder, getReminder, updateReminder } from './reminders/index.js'
import { createGroup, getGroups } from './groups/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    getUserDatos,
    updateUserData,
    getUsers,

    createNote,
    getNotes,
    deleteNote,
    getNote,
    updateNote,

    createReminder,
    getReminders,
    deleteReminder,
    getReminder,
    updateReminder,

    createGroup,
    getGroups
}
export default logic