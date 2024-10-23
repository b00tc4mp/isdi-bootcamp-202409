import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import logoutUser from './logoutUser'
import toggleLikePost from './toggleLikePost'
import createPost from './createPost'
import getPosts from './getPosts'
import deletePost from './deletePost'


const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    logoutUser,
    toggleLikePost,
    createPost,
    getPosts,
    deletePost
}

export default logic