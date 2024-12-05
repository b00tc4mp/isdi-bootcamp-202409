import { registerUser, authenticateUser, getUserName, getUserDatos, updateUserData } from './users/index.js'
import { createNote, getNotes } from './notes/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    getUserDatos,
    updateUserData,

    createNote,
    getNotes
}
export default logic