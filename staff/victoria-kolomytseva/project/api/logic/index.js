import {
    registerUser,
    authenticateUser,
    saveUser,
    getUserById
} from './users/index.js'


import {
    createPost,
    getPosts

} from './posts/index.js'


const logic = {
    registerUser,
    authenticateUser,
    saveUser,
    getUserById,


    createPost,
    getPosts
}

export default logic

