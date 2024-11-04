import registerUser from './registerUser'
import authenticateUser from './authenticateUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserId from './getUserId'
import getUserName from './getUserName'
import getUserUsername from './getUserUsername'
import logoutUser from './logoutUser'

import createPost from './createPost'
import getPosts from './getPosts'
import deletePost from './deletePost'
import toggleLikePost from './toggleLikePost'

import addComment from './addComment'
import getComments from './getComments'
import removeComment from './removeComment'

const logic = {
  registerUser,
  authenticateUser,
  isUserLoggedIn,
  getUserName,
  getUserUsername,
  getUserId,
  logoutUser,

  createPost,
  getPosts,
  deletePost,
  toggleLikePost,

  addComment,
  getComments,
  removeComment
}

export default logic