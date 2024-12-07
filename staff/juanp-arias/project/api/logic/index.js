import { registerUser, authenticateUser, getUserName, getUserDatos, updateUserData } from './users/index.js'
import { createNote, getNotes, deleteNote } from './notes/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    getUserDatos,
    updateUserData,

    createNote,
    getNotes,
    deleteNote
}
export default logic