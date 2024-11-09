import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import getPosts from './getPosts.js'
import addComment from './addComment.js'
//import getComments from './getComments.js'
import removeComment from './removeComment.js'
import toggleLikePost from './toggleLikePost.js'
//import toggleSavePost from './toggleSavePost.js'
import deletePost from './deletePost.js'

const logic = {
    authenticateUser,
    registerUser,
    getUserName,

    createPost,
    getPosts,
    deletePost,
    toggleLikePost,
    //toggleSavePost,

    addComment,
    //getComments,
    removeComment
}

export default logic