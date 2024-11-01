import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import deletepost from './deletePost.js'
import getPosts from './getPosts.js'
import createComment from './createComment.js'
import removeComment from './removeComment.js'
import getComments from './getComments.js'
import toggleLikePost from './toggleLikePost.js'

const logic = {
    authenticateUser,
    registerUser,
    getUserName,

    createPost,
    deletepost,
    getPosts,
    toggleLikePost,

    createComment,
    getComments,
    removeComment
}

export default logic