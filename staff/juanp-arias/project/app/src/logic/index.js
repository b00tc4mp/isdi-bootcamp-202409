import { registerUser, loginUser, logoutUser, isUserLoggedIn, getUserName, getUserDatos, updateUserData } from './users'
import { createNote, getNotes } from './notes'

const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserName,
    getUserDatos,
    updateUserData,

    createNote,
    getNotes
}
export default logic