import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import getPosts from './getPosts.js'
import deletePost from './deletePost.js'
import toggleLikePost from './toggleLikePost.js'

const logic = {
    authenticateUser,
    registerUser,
    getUserName,

    createPost,
    getPosts,
    deletePost,
    toggleLikePost
}

export default logic