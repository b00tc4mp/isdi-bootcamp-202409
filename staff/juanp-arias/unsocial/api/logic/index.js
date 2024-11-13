import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import getPosts from './getPosts.js'
import toggleLikePosts from './toggleLikePosts.js'
import addComments from './addComments.js'
import getComments from './getComments.js'
import removeComment from './removeComment.js'

const logic = {
    authenticateUser,
    registerUser,
    getUserName,

    getPosts,
    createPost,
    deletePost,
    toggleLikePosts,

    addComments,
    removeComment,
    getComments,
}

export default logic