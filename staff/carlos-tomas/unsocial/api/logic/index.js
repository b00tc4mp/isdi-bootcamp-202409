import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import addComment from './addComment.js'
import deletePost from './deletePost.js'
import toggleLikePost from './toggleLikePost.js'
import removeComments from './removeComments.js'
import getPosts from './getPosts.js'


const logic = {
    authenticateUser,
    registerUser,
    getUserName,

    createPost,
    deletePost,
    getPosts,

    addComment,
    removeComments,

    toggleLikePost
}

export default logic