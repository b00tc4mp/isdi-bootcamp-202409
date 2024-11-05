import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import addComment from './addComment.js'
import removeComment from './removeComment.js'
import deletePost from './deletePost.js'
import getPosts from './getPosts.js'
import getComments from './getComments.js'
import toggleLikePost from './toggleLikePost.js'




const logic = {
    authenticateUser,
    registerUser,
    getUserName,
    getPosts,
    createPost,
    getComments,
    addComment,
    removeComment,
    deletePost,
    toggleLikePost
}

export default logic