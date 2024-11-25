import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import addComment from './addComment.js'
import deletePost from './deletePost.js'
import toggleLikePost from './toggleLikePost.js'
import removeComment from './removeComment.js'
import getPosts from './getPosts.js'
import getComments from './getComments.js'


const logic = {
    authenticateUser,
    registerUser,
    getUserName,

    createPost,
    deletePost,
    getPosts,

    addComment,
    removeComment,
    getComments,

    toggleLikePost
}

export default logic