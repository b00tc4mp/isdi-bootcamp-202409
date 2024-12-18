import { registerUser, authenticateUser, getUserName, getUserDatos, updateUserData, getUsers } from './users/index.js'
import { createNote, getNotes, deleteNote, getNote, updateNote } from './notes/index.js'
import { createReminder, getRemindersByDate, deleteReminder, editReminder, updateReminder, getReminders } from './reminders/index.js'
import { createGroup, deleteGroup, getGroups } from './groups/index.js'
import { createTask, getTasks, getTasksCreated, deleteTask, toggleTaskViewed } from './tasks/index.js'
import { getLastNote, getRemindersCount, getTasksCount, getTasksCreatedCount } from './home/index.js'

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
    getRemindersByDate,
    deleteReminder,
    editReminder,
    updateReminder,

    createGroup,
    getGroups,
    deleteGroup,

    createTask,
    getTasks,
    getTasksCreated,
    deleteTask,
    toggleTaskViewed,

    getRemindersCount,
    getTasksCount,
    getLastNote,
    getReminders,
    getTasksCreatedCount
}
export default logic