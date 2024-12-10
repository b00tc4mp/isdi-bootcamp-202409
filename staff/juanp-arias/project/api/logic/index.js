import { registerUser, authenticateUser, getUserName, getUserDatos, updateUserData, getUsers } from './users/index.js'
import { createNote, getNotes, deleteNote, getNote, updateNote } from './notes/index.js'
import { createReminder, getReminders } from './reminders/index.js'

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
    getReminders
}
export default logic