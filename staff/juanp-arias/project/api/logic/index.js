import { registerUser, authenticateUser, getUserName, getUserDatos, updateUserData } from './users/index.js'
import { createNote, getNotes, deleteNote, getNote, updateNote } from './notes/index.js'
import { createReminder, getReminders } from './reminders/index.js'

const logic = {
    registerUser,
    authenticateUser,
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