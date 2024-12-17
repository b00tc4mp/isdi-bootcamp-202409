import { registerUser, loginUser, logoutUser, isUserLoggedIn, getUserName, getUserDatos, updateUserData, getUserRole, isUserRoleStudent, isUserRoleTeacher, getUsers } from './users'
import { createNote, getNotes, deleteNote, getNote, updateNote } from './notes'
import { createReminder, getRemindersByDate, deleteReminder, editReminder, updateReminder, getReminders } from './reminders'
import { createGroup, getGroups, deleteGroup } from './groups'
import { createTask, getTasks, getTasksCreated, deleteTask } from './tasks'
import { getLastNote, getRemindersCount, getTasksCount, getTasksCreatedCount } from './home'

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
    getRemindersByDate,
    editReminder,
    updateReminder,
    deleteReminder,
    getReminders,

    createGroup,
    getGroups,
    deleteGroup,

    createTask,
    getTasks,
    getTasksCreated,
    deleteTask,

    getLastNote,
    getRemindersCount,
    getTasksCount, 
    getTasksCreatedCount
}
export default logic