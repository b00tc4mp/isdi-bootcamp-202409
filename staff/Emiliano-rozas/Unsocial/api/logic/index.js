import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import addComment from './addComment.js'
import removeComments from './removeComments.js'
import getComments from './getComments.js'
import getPosts from './getPosts.js'
import toggleLikePost from './toggleLikePost.js'
import deletePost from './deletePost.js'

const logic = {
    authenticateUser,
    registerUser,
    getUserName,

    createPost,
    getPosts,
    deletePost,
    toggleLikePost,

    getComments,
    addComment,
    removeComments,
}

export default logic