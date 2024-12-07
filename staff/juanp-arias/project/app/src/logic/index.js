import { registerUser, loginUser, logoutUser, isUserLoggedIn, getUserName, getUserDatos, updateUserData } from './users'
import { createNote, getNotes, deleteNote } from './notes'

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
    deleteNote
}
export default logic