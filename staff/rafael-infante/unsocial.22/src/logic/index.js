import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import getUserUsername from './getUserUsername'
import logoutUser from './logoutUser'

import createPost from './createPost'
import getPosts from './getposts'
import toggleLikePost from './toggleLikePost'

const logic = {
  registerUser,
  loginUser,
  isUserLoggedIn,
  getUserName,
  getUserUsername,
  logoutUser,
  createPost,
  getPosts,
  toggleLikePost
}

export default logic