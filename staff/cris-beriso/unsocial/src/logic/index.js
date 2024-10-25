import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import logoutUser from './logoutUser'

import createPost from './createPost'
import deletePost from './deletePost'
import getPosts from './getPosts'
import toggleLikePost from './toggleLikePost'
import getUserId from './getUserId'
import createComment from './createComment'
import getComments from './getComments'

const logic = {
  registerUser,
  loginUser,
  isUserLoggedIn,
  getUserName,
  logoutUser,

  createPost,
  deletePost,
  getPosts,
  toggleLikePost,
  getUserId,
  createComment,
  getComments
}

export default logic