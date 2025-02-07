import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import getUserUsername from './getUserUsername'
import logoutUser from './logoutUser'

import createPost from './createPost'
import getPosts from './getPosts'
import deletePost from './deletePost'
import toggleLikePost from './toggleLikePost'
import getUserId from './getUserId'

const logic = {
  registerUser,
  loginUser,
  isUserLoggedIn,
  getUserName,
  getUserUsername,
  getUserId,
  logoutUser,
  createPost,
  getPosts,
  deletePost,
  toggleLikePost
}

export default logic