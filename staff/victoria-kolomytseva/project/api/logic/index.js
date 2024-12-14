import {
    registerUser,
    authenticateUser,
    saveUser,
    getUserById
} from './users/index.js'


import {
    createPost,
    getPosts,
    getPostById

} from './posts/index.js'


const logic = {
    registerUser,
    authenticateUser,
    saveUser,
    getUserById,
    getPostById,


    createPost,
    getPosts,
    getPostById
}

export default logic

